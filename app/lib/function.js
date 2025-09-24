import { inngest } from "@/app/lib/inngest/client";
import { db } from "@/lib/prisma";

export const checkBudgetAlert = inngest.createFunction(
  { name: "Check Budget Alerts" },
  { cron: "0 */6 * * *" },
  async ({ step }) => {
    // Fetch all budgets with users and default accounts
    const budgets = await step.run("fetch-budgets", async () => {
      return db.budget.findMany({
        include: {
          user: {
            include: {
              accounts: {
                where: { isDefault: true },
              },
            },
          },
        },
      });
    });

    for (const budget of budgets) {
      const defaultAccount = budget.user.accounts[0];
      if (!defaultAccount) continue;

      await step.run(`check-budget-${budget.id}`, async () => {
        // First day of the current month
        const startOfMonth = new Date();
        startOfMonth.setDate(1);

        // Aggregate expenses for this month
        const expenses = await db.transaction.aggregate({
          where: {
            userId: budget.userId,
            accountId: defaultAccount.id,
            type: "Expense",
            date: { gte: startOfMonth },
          },
          _sum: { amount: true },
        });

        const totalExpenses = expenses._sum.amount?.toNumber() || 0;
        const budgetAmount = budget.amount || 0; // avoid division by zero
        const percentageUsed = budgetAmount ? (totalExpenses / budgetAmount) * 100 : 0;

        console.log(`Budget ID ${budget.id}: ${percentageUsed.toFixed(2)}% used`);

        // Check if alert should be sent
        if (
          percentageUsed >= 80 &&
          (!budget.lastAlertSent || isNewMonth(new Date(budget.lastAlertSent), new Date()))
        ) {
          console.log(`Sending alert for Budget ID ${budget.id}`);
          
          // Update last alert sent date
          await db.budget.update({
            where: { id: budget.id },
            data: { lastAlertSent: new Date() },
          });
        }
      });
    }
  }
);

// Helper to check if a new month has started since last alert
function isNewMonth(lastAlertDate: Date, currentDate: Date) {
  return (
    lastAlertDate.getMonth() !== currentDate.getMonth() ||
    lastAlertDate.getFullYear() !== currentDate.getFullYear()
  );
}
