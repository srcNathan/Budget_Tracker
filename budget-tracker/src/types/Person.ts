import type { Expense } from "./BudgetData";

export interface Person {
  id: string;
  name: string;
  email: string;
  expenses: Expense[];
}