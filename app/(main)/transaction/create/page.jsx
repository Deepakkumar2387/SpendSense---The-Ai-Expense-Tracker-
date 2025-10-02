export const dynamic = "force-dynamic"; // ✅ Prevents prerender error
import { getUserAccounts } from "@/app/actions/dashboard";
import { getTransaction } from "@/app/actions/transaction";
import { defaultCategories } from "@/data/categories";
import { AddTransactionForm } from "../_components/transaction-form";

export default async function AddTransactionPage({ searchParams }) {
  // searchParams ko await karo
  const params = await searchParams;
  const accounts = await getUserAccounts();
  const editId = params?.edit;

  let initialData = null;
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }

  return (
    <div className="max-w-3xl mx-auto px-5">
      <div className="flex justify-center md:justify-normal mb-8">
        <h1 className="text-5xl gradient-title">
          {editId ? 'Edit Transaction' : 'Add Transaction'}
        </h1>
      </div>
      <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />
    </div>
  );
}