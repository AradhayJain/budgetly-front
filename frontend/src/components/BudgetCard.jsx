import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";

const BudgetCard = () => {
  const { user } = useContext(UserContext);

  const totalIncome = user?.incomeSources?.reduce((sum, item) => sum + Number(item.amount), 0) || 0;
  const totalSpend = user?.primarySpends?.reduce((sum, item) => sum + Number(item.amount), 0) || 0;
  const balance = (user?.monthlyBudget || 0) - totalSpend;

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Budget Overview</h2>
      <div className="space-y-2">
        <div className="flex justify-between text-gray-600">
          <span>Monthly Budget</span>
          <span className="font-medium text-gray-800">₹ {user?.monthlyBudget}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Total Income</span>
          <span className="font-medium text-green-600">₹ {totalIncome}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Total Spends</span>
          <span className="font-medium text-red-600">₹ {totalSpend}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Remaining Balance</span>
          <span className="font-medium text-blue-600">₹ {balance}</span>
        </div>
      </div>
    </div>
  );
};

export default BudgetCard;