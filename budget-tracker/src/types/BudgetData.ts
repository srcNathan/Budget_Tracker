import type { Person } from "./Person";

export interface BudgetData {
  meta: {
    currency: string;
    version: number;
    last_updated: string;
  };
  people: Person[];
}

