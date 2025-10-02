
import { checkBudgetAlert, checkBudgetAlerts, generateMonthlyReports, processRecurringTransaction, triggerRecurringTransactions } from "@/lib/inngest/function";
import { inngest } from "@/lib/inngest/client";
import { serve } from "inngest/next";


// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    processRecurringTransaction, 
    triggerRecurringTransactions, 
     generateMonthlyReports,
     checkBudgetAlerts,
  ],
  baseUrl: process.env.APP_URL,

});