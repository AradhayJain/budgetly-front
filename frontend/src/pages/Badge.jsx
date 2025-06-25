import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
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
  TrophyIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

// Badge evaluator
const evaluateBadges = (expenses, setupData) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const badges = [];

  const totalIncome = setupData.totalIncome || 0;
  const totalSpendingLimit = setupData.PrimarySpendsLimits?.reduce((sum, e) => sum + parseInt(e.amount, 10), 0);
  const categoryLimits = {};
  setupData.PrimarySpendsLimits?.forEach(limit => {
    categoryLimits[limit.title] = parseInt(limit.amount, 10);
  });

  const monthlyExpenses = expenses.filter(e => {
    const d = new Date(e.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const spentByCategory = {};
  const spentByDay = {};

  monthlyExpenses.forEach(exp => {
    const { category, amount, date } = exp;
    spentByCategory[category] = (spentByCategory[category] || 0) + parseInt(amount);
    const day = format(new Date(date), "yyyy-MM-dd");
    spentByDay[day] = (spentByDay[day] || 0) + parseInt(amount);
  });

  // ✅ Limit Saver Badge
  const crossedLimit = Object.entries(spentByCategory).some(
    ([cat, amount]) => categoryLimits[cat] && amount > categoryLimits[cat]
  );
  if (!crossedLimit) {
    badges.push({
      name: "Limit Saver",
      description: "You stayed within all your spending limits this month!",
      icon: <CheckBadgeIcon className="h-6 w-6 text-green-600" />,
    });
  }

  // 💰 Smart Saver
  const totalSpent = Object.values(spentByCategory).reduce((a, b) => a + b, 0);
  const saved = totalIncome - totalSpent;
  if (saved > totalIncome * 0.3) {
    badges.push({
      name: "Smart Saver",
      description: "You saved more than 30% of your income this month!",
      icon: <TrophyIcon className="h-6 w-6 text-yellow-500" />,
    });
  }

  // 📊 Consistent Tracker
  if (Object.keys(spentByDay).length >= 20) {
    badges.push({
      name: "Consistent Tracker",
      description: "You've tracked expenses on 20+ days this month!",
      icon: <CalendarIcon className="h-6 w-6 text-blue-600" />,
    });
  }

  // ⛔ No Spending Days
  const zeroDays = Array.from({ length: 31 }, (_, i) => {
    const day = new Date(currentYear, currentMonth, i + 1);
    const key = format(day, "yyyy-MM-dd");
    return spentByDay[key] ? 0 : 1;
  }).reduce((a, b) => a + b, 0);

  if (zeroDays >= 3) {
    badges.push({
      name: "Zero Spending",
      description: "You had at least 3 no-spending days this month!",
      icon: <TrophyIcon className="h-6 w-6 text-purple-600" />,
    });
  }

  return badges;
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

const BadgesPage = () => {
  const { Expenses, setupData } = useContext(UserContext);
  const [earnedBadges, setEarnedBadges] = useState([]);
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [activeItem, setActiveItem] = useState("Badges Earned");

  useEffect(() => {
    if (Expenses && setupData) {
      const badges = evaluateBadges(Expenses, setupData);
      setEarnedBadges(badges);
    }
  }, [Expenses, setupData]);

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
          className={`fixed top-0 left-0 h-full bg-white shadow-xl z-50 transition-all duration-300 ease-in-out
            ${isActive ? "w-64" : "w-16"}
            ${isActive ? "translate-x-0" : "-translate-x-full"}
            lg:relative lg:translate-x-0 lg:w-${isActive ? "64" : "16"}`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className={`flex items-center gap-3 ${!isActive && "lg:justify-center"}`}>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <ArrowTrendingUpIcon className="h-5 w-5 text-white" />
              </div>
              {isActive && <span className="text-xl font-bold text-gray-800">Budgetly</span>}
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

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-200 ml-0 lg:ml-${isActive ? "64" : "16"}`}>
        <div className="max-w-5xl mx-auto py-10 px-4">
          <h1 className="text-4xl font-bold text-blue-700 mb-8">🎖️ Your Badges</h1>

          {earnedBadges.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {earnedBadges.map((badge, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full">
                    {badge.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{badge.name}</h3>
                    <p className="text-sm text-gray-600">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-16">
              No badges earned yet this month. Stay consistent and keep tracking your expenses!
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BadgesPage;
