import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";

const SpendList = () => {
  const { user } = useContext(UserContext);

  if (!user?.primarySpends?.length) return <p className="text-gray-500">No spends recorded yet.</p>;

  return (
    <ul className="divide-y divide-gray-200">
      {user.primarySpends.map((spend, index) => (
        <li key={index} className="py-2 flex justify-between text-gray-700">
          <span>{spend.title}</span>
          <span className="text-red-600 font-medium">₹ {spend.amount}</span>
        </li>
      ))}
    </ul>
  );
};

export default SpendList;
