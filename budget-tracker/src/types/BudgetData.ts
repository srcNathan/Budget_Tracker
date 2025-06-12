import type { Person } from "./Person";

export interface BudgetData {
  meta: {
    currency: string;
    version: number;
    last_updated: string;
  };
  people: Person[];
}

export interface Expense {
  id: string;
  date: string;
  amount: number;
  category: string;
  description: string;
  payment_method: string;
  tags: string[];
  recurring: null | {
    interval: string;
    start_date: string;
    end_date: string | null;
  };
}