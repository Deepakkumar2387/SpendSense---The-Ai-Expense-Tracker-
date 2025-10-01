
import { checkBudgetAlert } from "@/app/lib/function";
import { inngest } from "@/app/lib/inngest/client";
import { serve } from "inngest/next";


// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    checkBudgetAlert
  ],
});