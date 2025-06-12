import React from "react";
import type { Expense } from "../types/BudgetData";

interface Props {
  expenses: Expense[];
}

const Expenses: React.FC<Props> = ({ expenses }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Expenses</h2>
      <ul className="space-y-2">
        {expenses.map((exp) => (
          <li key={exp.id} className="border p-2 rounded">
            <div>{exp.date} - {exp.category}</div>
            <div>${exp.amount.toFixed(2)} — {exp.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expenses;
