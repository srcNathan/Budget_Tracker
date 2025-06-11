import React, { useEffect, useState } from "react";
import Expenses from "./components/Expenses";
import type { BudgetData } from "./types";

function App() {
  const [data, setData] = useState<BudgetData | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("budget_data");
    if (saved) {
      setData(JSON.parse(saved));
    } else {
      const initData: BudgetData = {
        meta: {
          currency: "USD",
          version: 1,
          last_updated: new Date().toISOString(),
        },
        people: [
          {
            id: "user001",
            name: "Nathan W.",
            email: "nathan@example.com",
            expenses: [],
          },
        ],
      };
      localStorage.setItem("budget_data", JSON.stringify(initData));
      setData(initData);
    }
  }, []);

  if (!data) return <div>Loading...</div>;

  const user = data.people[0];

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold p-4">Budget Tracker for {user.name}</h1>
      <Expenses expenses={user.expenses} />
    </div>
  );
}

export default App;
