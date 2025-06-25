import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { format } from "date-fns";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {
  ArrowTrendingUpIcon,
  Bars3Icon,
  ChartPieIcon,
  UsersIcon,
  CheckBadgeIcon,
  PlusCircleIcon,
  ChartBarIcon,
  AdjustmentsHorizontalIcon,
  DocumentChartBarIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

// Group expenses by date
const groupExpensesByDate = (expenses) => {
  const dailyTotals = {};
  expenses.forEach((exp) => {
    const date = format(new Date(exp.date), "yyyy-MM-dd");
    dailyTotals[date] = (dailyTotals[date] || 0) + parseInt(exp.amount, 10);
  });

  return Object.entries(dailyTotals).map(([date, total]) => ({
    date,
    total,
  })).sort((a, b) => new Date(a.date) - new Date(b.date));
};

const sidebarItems = [
  { icon: <ChartPieIcon className="h-5 w-5" />, label: "Dashboard", path: "/dashboard" },
  { icon: <UsersIcon className="h-5 w-5" />, label: "Group Savings", path: "/group-savings" },
  { icon: <CheckBadgeIcon className="h-5 w-5" />, label: "Badges Earned", path: "/badges" },
  { icon: <PlusCircleIcon className="h-5 w-5" />, label: "Add Income", path: "/add-income" },
  { icon: <PlusCircleIcon className="h-5 w-5" />, label: "Add Expense", path: "/add-expense" },
  { icon: <ChartBarIcon className="h-5 w-5" />, label: "Analytics", path: "/analytics" },
  { icon: <AdjustmentsHorizontalIcon className="h-5 w-5" />, label: "Change Limits", path: "/limits" },
  { icon: <DocumentChartBarIcon className="h-5 w-5" />, label: "Summaries", path: "/summaries" },
  { icon: <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />, label: "Support", path: "/support" },
];

// Chart Component
const DailySpendChart = ({ expenses }) => {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow border border-gray-100 text-center text-gray-500">
        No expense data available.
      </div>
    );
  }

  const data = groupExpensesByDate(expenses);

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100 p-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">
        Daily Spending Overview
      </h3>
      <div className="h-[550px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value) => `₹${value}`} />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Main Page
const AnalyticsPage = () => {
  const { Expenses } = useContext(UserContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [activeItem, setActiveItem] = useState("Analytics");

  useEffect(() => {
    if (Expenses) setIsLoaded(true);
  }, [Expenses]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex">
      {/* Sidebar */}
      <>
        {isActive && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsActive(false)}
          />
        )}
        <aside
          className={`
            fixed top-0 left-0 h-full bg-white shadow-xl z-50 transition-all duration-300 ease-in-out
            ${isActive ? "w-64" : "w-16"}
            ${isActive ? "translate-x-0" : "-translate-x-full"}
            lg:relative lg:translate-x-0 lg:w-${isActive ? "64" : "16"}
          `}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className={`flex items-center gap-3 ${!isActive && "lg:justify-center"}`}>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <ArrowTrendingUpIcon className="h-5 w-5 text-white" />
              </div>
              {isActive && (
                <span className="text-xl font-bold text-gray-800">Budgetly</span>
              )}
            </div>
            <button
              onClick={() => setIsActive(!isActive)}
              className="p-1 rounded-lg hover:bg-gray-100 absolute left-20 transition-colors lg:hidden"
            >
              {!isActive && <Bars3Icon className="h-5 w-5" />}
            </button>
          </div>
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    navigate(item.path);
                    setActiveItem(item.label);
                    setIsActive(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
                    ${
                      activeItem === item.label
                        ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }
                    ${!isActive && "lg:justify-center lg:px-2"}
                  `}
                  title={!isActive ? item.label : undefined}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {isActive && (
                    <span className="font-medium text-sm">{item.label}</span>
                  )}
                </button>
              ))}
            </div>
          </nav>
          <div className="p-4 border-t border-gray-200 hidden lg:block">
            <button
              onClick={() => setIsActive(!isActive)}
              className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Bars3Icon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </aside>
      </>

      {/* Main */}
      <main
        className={`flex-1 transition-all duration-200 ml-0 lg:ml-${isActive ? "64" : "16"}`}
      >
        <div className="max-w-7xl mx-auto py-8 px-4">
          <h1 className="text-4xl font-bold text-blue-700 flex items-center gap-3 mb-8">
            <ChartBarIcon className="h-8 w-8 text-blue-600" />
            Spending Analytics
          </h1>

          {isLoaded ? (
            <DailySpendChart expenses={Expenses} />
          ) : (
            <div className="bg-white p-6 rounded-xl text-center shadow">
              Loading expense data...
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AnalyticsPage;
