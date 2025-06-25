import React, { useContext } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { UserContext } from "../Context/UserContext";

const COLORS = ["#4ade80", "#f87171"];

const Charts = () => {
  const { user } = useContext(UserContext);

  const income = user?.incomeSources?.reduce((sum, i) => sum + Number(i.amount), 0) || 0;
  const spends = user?.primarySpends?.reduce((sum, i) => sum + Number(i.amount), 0) || 0;

  const data = [
    { name: "Income", value: income },
    { name: "Spends", value: spends }
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Income vs. Spends</h2>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;
