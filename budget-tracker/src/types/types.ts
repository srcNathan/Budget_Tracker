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

export interface Person {
  id: string;
  name: string;
  email: string;
  expenses: Expense[];
}

export interface BudgetData {
  meta: {
    currency: string;
    version: number;
    last_updated: string;
  };
  people: Person[];
}

export interface DollarSign {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  symbol: string;
}
