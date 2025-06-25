import React, { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../Context/UserContext";
import axios from "axios";
// import "./style.css"
import {
  PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";
import {
  BellIcon,
  ArrowTrendingUpIcon,
  CurrencyRupeeIcon,
  ChartPieIcon,
  ExclamationTriangleIcon,
  UsersIcon,
  TrophyIcon,
  CheckBadgeIcon,
  ChatBubbleLeftEllipsisIcon,
  PlusCircleIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  CalendarIcon,
  ArrowUpRightIcon,
  ArrowDownRightIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
  UserIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  LightBulbIcon,
  ChevronUpIcon,
  AdjustmentsHorizontalIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import ChatBot from "../components/ChatBot";

const COLORS = ["#6366f1", "#f59e42", "#f43f5e", "#10b981", "#fbbf24", "#3b82f6", "#eab308", "#8b5cf6"];

// Sidebar config with correct icons
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

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
    <div className="text-center">
      <div className="relative mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
          <ArrowTrendingUpIcon className="h-8 w-8 text-white" />
        </div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-blue-200 rounded-2xl animate-spin mx-auto"></div>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Dashboard</h2>
      <p className="text-gray-600 max-w-md mx-auto">
        We're preparing your personalized financial insights and analytics...
      </p>
      
      <div className="mt-8 flex justify-center">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  </div>
);

// Sidebar Component
const Sidebar = ({ navigate, setIsActive, isActive, activeItem, setActiveItem }) => (
  <>
    {/* Mobile Overlay */}
    {isActive && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={() => setIsActive(false)}
      />
    )}

    {/* Sidebar */}
    <aside
      className={`
        fixed top-0 left-0 h-full bg-white shadow-xl z-50 transition-all duration-300 ease-in-out
        ${isActive ? 'w-64' : 'w-16'}
        lg:relative lg:translate-x-0
        ${isActive ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className={`flex items-center gap-3 ${!isActive && 'lg:justify-center'}`}>
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <ArrowTrendingUpIcon className="h-5 w-5 text-white" />
          </div>
          {isActive && (
            <span className="text-xl font-bold text-gray-800">Budgetly</span>
          )}
        </div>
        <button
          onClick={() => setIsActive(!isActive)}
          className="p-1 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
        >
          {isActive && <XMarkIcon className="h-5 w-5" />}
        </button>
      </div>

      {/* Navigation */}
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
                    ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
                ${!isActive && 'lg:justify-center lg:px-2'}
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

      {/* Toggle Button for Desktop */}
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
);

// Navbar Component
const Navbar = ({ navigate,user, onMenuToggle, sidebarOpen }) => (
  <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
          >
            <Bars3Icon className="h-5 w-5 text-gray-600" />
          </button>
          
          {/* Search Bar */}
          <h1>Acheive Your Goals!</h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
        
          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900">
                {user?.name?.split(' ')[0] || 'User'}
              </p>
              <p className="text-xs text-gray-500">
                {user?.email || 'user@example.com'}
              </p>
            </div>
            <img
              onClick={()=>navigate('/get-profile')}
              src={`https:/https://budgetly-back-k8l5.onrender.com/api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || 'user'}`}
              alt="Profile"
              className="h-8 w-8 rounded-full border-2 border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  </nav>
);

// Hero Section Component
const HeroSection = ({ user }) => {
  const {Expenses,incomeSources}=useContext(UserContext)
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Aggregate income and expenses
  const totalIncome = incomeSources?.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  const totalExpenses = Expenses?.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  const usagePercent = user?.monthlyBudget
    ? (totalExpenses / user.monthlyBudget) * 100
    : 0;

  const savingRatio = totalIncome
    ? ((totalIncome - totalExpenses) / totalIncome) * 100
    : 0;

  // Determine financial health
  let health = "Unknown";
  if (usagePercent <= 60 && savingRatio >= 30) {
    health = "Excellent";
  } else if (usagePercent <= 80 && savingRatio >= 15) {
    health = "Good";
  } else if (usagePercent <= 100 && savingRatio >= 5) {
    health = "Fair";
  } else {
    health = "Poor";
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-2xl p-8 text-white shadow-lg mb-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <CalendarIcon className="h-5 w-5 text-blue-200" />
            <span className="text-blue-100 text-sm font-medium">{currentDate}</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-3">
            Welcome back, {user?.name?.split(" ")[0] || "User"}! 👋
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            Your financial journey continues. Track your progress, manage expenses, 
            and achieve your savings goals with intelligent insights.
          </p>
        </div>

        {/* Health Box */}
        <div className="mt-6 lg:mt-0 lg:ml-8">
          <div className="bg-blue-300 bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20 text-center">
            <ArrowTrendingUpIcon className="h-12 w-12 text-white mb-2" />
            <p className="text-sm text-blue-100">Financial Health</p>
            <p className="text-2xl font-bold">{health}</p>
            <p className="text-sm text-blue-200 mt-1">
              Usage: {usagePercent.toFixed(0)}% | Savings: {savingRatio.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


// Budget Card Component
const BudgetCard = ({ user }) => {
  const { Expenses, PrimarySpendsLimits, incomeSources } = useContext(UserContext);
  const [overrunCategories, setOverrunCategories] = useState([]);
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const [budgetOverrun, setBudgetOverrun] = useState(false);
  const [showBudgetPopup, setShowBudgetPopup] = useState(false);

  if (!user) return <div className="bg-white rounded-2xl p-6 animate-pulse">Loading...</div>;

  const totalSpendingLimit = user?.PrimarySpendsLimits?.reduce(
    (sum, item) => sum + parseInt(item.amount, 10),
    0
  );
  const totalIncome = incomeSources?.reduce(
    (sum, item) => sum + parseInt(item.amount, 10),
    0
  );
  const totalActualSpent = Expenses?.reduce((sum, e) => sum + parseInt(e.amount, 10), 0) || 0;

  const usagePercent = Math.round((totalSpendingLimit / user.monthlyBudget) * 100);
  const spentUsagePercent = Math.round((totalActualSpent / user.monthlyBudget) * 100);

  const getColor = (percent) => {
    if (percent > 90) return 'bg-red-500';
    if (percent > 75) return 'bg-amber-500';
    return 'bg-green-500';
  };

  const categorySpending = user.PrimarySpendsLimits.map((limitItem) => {
    const spent = Expenses?.filter((exp) => exp.category === limitItem.title)
      .reduce((sum, exp) => sum + parseInt(exp.amount, 10), 0) || 0;
    const percent = Math.round((spent / limitItem.amount) * 100);
    return {
      ...limitItem,
      spent,
      percent,
    };
  });

  // Detect category overruns
  useEffect(() => {
    const overruns = categorySpending.filter(cat => cat.spent > cat.amount);
    setOverrunCategories(overruns);
    setShowCategoryPopup(overruns.length > 0);
  // eslint-disable-next-line
  }, [Expenses, user.PrimarySpendsLimits]);

  // Detect overall budget overrun
  useEffect(() => {
    if (totalActualSpent > user.monthlyBudget) {
      setBudgetOverrun(true);
      setShowBudgetPopup(true);
    } else {
      setBudgetOverrun(false);
      setShowBudgetPopup(false);
    }
  }, [totalActualSpent, user.monthlyBudget]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow relative">
      {/* Budget Overrun Popup */}
      {showBudgetPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-bold text-red-600 mb-3">Budget Limit Exceeded!</h3>
            <p className="text-gray-800 mb-4">
              Your total spending (<b>₹{totalActualSpent.toLocaleString()}</b>) has exceeded your monthly budget (<b>₹{user.monthlyBudget.toLocaleString()}</b>).
            </p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => setShowBudgetPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Category Overrun Popup */}
      {showCategoryPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-bold text-red-600 mb-3">Category Limit Exceeded!</h3>
            <ul className="mb-4">
              {overrunCategories.map(cat => (
                <li key={cat.title} className="text-gray-800 mb-2">
                  <span className="font-semibold">{cat.title}:</span>
                  &nbsp;Spent ₹{cat.spent} / Limit ₹{cat.amount}
                </li>
              ))}
            </ul>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => setShowCategoryPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <CurrencyRupeeIcon className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Monthly Budget</p>
            <p className="text-2xl font-bold text-gray-900">
              ₹{user.monthlyBudget?.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Limit Allocation */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Limit Allocation w.r.t Budget</span>
          <span className="text-sm font-semibold text-gray-700">{usagePercent}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getColor(usagePercent)}`}
            style={{ width: `${Math.min(usagePercent, 100)}%` }}
          />
        </div>
      </div>

      {/* Actual Spending */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Actual Spending (transactions)</span>
          <span className="text-sm font-semibold text-gray-700">{spentUsagePercent}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getColor(spentUsagePercent)}`}
            style={{ width: `${Math.min(spentUsagePercent, 100)}%` }}
          />
        </div>
      </div>

      {/* Income & Spending */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
          <div className="flex items-center gap-2 mb-1">
            <ArrowTrendingUpIcon className="h-4 w-4 text-green-600" />
            <span className="text-xs text-green-600 font-medium">Total Income</span>
          </div>
          <p className="text-lg font-bold text-green-700">₹{totalIncome.toLocaleString()}</p>
        </div>

        <div className="bg-red-50 rounded-xl p-4 border border-red-100">
          <div className="flex items-center gap-2 mb-1">
            <ArrowDownRightIcon className="h-4 w-4 text-red-600" />
            <span className="text-xs text-red-600 font-medium">Planned Spending</span>
          </div>
          <p className="text-lg font-bold text-red-700">₹{totalSpendingLimit.toLocaleString()}</p>
        </div>
      </div>

      {/* Balance */}
      <div className="mb-6 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Expected Balance</span>
          <span className="text-lg font-bold text-gray-900">
            ₹{(totalIncome - user.monthlyBudget).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Category-wise spending */}
      <div>
        <h4 className="text-md font-semibold text-gray-800 mb-3">Category Spending</h4>
        <div className="space-y-3">
          {categorySpending.map((cat, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{cat.title}</span>
                <span>₹{cat.spent} / ₹{cat.amount}</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div
                  className={`h-2 rounded-full ${getColor(cat.percent)} transition-all duration-300`}
                  style={{ width: `${Math.min(cat.percent, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



// Alerts Section Component
const AlertsSection = ({ budget }) => {
  const [isOpen, setIsOpen] = useState(false);

  const insights = budget?.insights || [];
  const recommendations = budget?.recommendations || [];

  if (insights.length === 0 && recommendations.length === 0) return null;

  const renderAlertCard = (icon, title, messages, type) => {
    const bgColor = {
      info: "bg-blue-50 border-blue-200 text-blue-800",
      tip: "bg-yellow-50 border-yellow-200 text-yellow-800",
    }[type];

    return messages.map((msg, idx) => (
      <div key={idx} className={`rounded-xl border p-4 ${bgColor} shadow-sm`}>
        <div className="flex items-start gap-3">
          <div className="mt-0.5 shrink-0">{icon}</div>
          <div className="text-sm text-gray-800">
            <h4 className="font-semibold mb-1">{title}</h4>
            <p className="leading-snug">{msg}</p>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-gray-800">AI Insights & Suggestions</h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 text-sm text-blue-600 hover:underline focus:outline-none"
        >
          {isOpen ? (
            <>
              Hide Details <ChevronUpIcon className="w-4 h-4" />
            </>
          ) : (
            <>
              Show Details <ChevronDownIcon className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="max-h-80 overflow-y-auto pr-1 space-y-4 scroll-smooth custom-scrollbar">
          {insights.length > 0 &&
            renderAlertCard(
              <InformationCircleIcon className="h-5 w-5 text-blue-600" />,
              "Insight",
              insights,
              "info"
            )}

          {recommendations.length > 0 &&
            renderAlertCard(
              <LightBulbIcon className="h-5 w-5 text-yellow-500" />,
              "Recommendation",
              recommendations,
              "tip"
            )}
        </div>
      )}
    </div>
  );
};

// Expense Chart Component
const ExpenseChart = ({ user }) => {
  const { Expenses } = useContext(UserContext);
  const expenses = user?.PrimarySpendsLimits;
  const [selectedCategory, setSelectedCategory] = useState(null);

  if (!expenses || expenses.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Breakdown</h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <ChartPieIcon className="h-8 w-8 text-gray-400" />
            </div>
            <p>No expense data available</p>
          </div>
        </div>
      </div>
    );
  }

  const chartData = expenses.map((expense, index) => ({
    name: expense.title,
    value: parseInt(expense.amount, 10),
    color: COLORS[index % COLORS.length],
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-blue-600 font-semibold">
            ₹{data.value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.05) return null;

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const totalLimits = expenses.reduce((sum, exp) => sum + parseInt(exp.amount, 10), 0);

  // Selected category data
  const relatedExpenses = Expenses?.filter(exp => exp.category === selectedCategory) || [];
  const categoryLimit = expenses.find(e => e.title === selectedCategory)?.amount || 0;
  const totalSpent = relatedExpenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const remaining = categoryLimit - totalSpent;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Expense Limits Breakdown</h3>
        <div className="text-sm text-gray-500">
          Total: ₹{totalLimits.toLocaleString()}
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={CustomLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              onClick={(_, index) => setSelectedCategory(chartData[index].name)}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <RechartsTooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value, entry) => (
                <span style={{ color: entry.color }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Category breakdown popup */}
      {selectedCategory && (
        <div className="mt-6 bg-gray-50 p-4 rounded-xl border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-lg font-semibold text-gray-800">{selectedCategory} Details</h4>
            <button
              className="text-sm text-blue-600 hover:underline"
              onClick={() => setSelectedCategory(null)}
            >
              Close
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-2">
            Limit: ₹{categoryLimit.toLocaleString()} &nbsp;|&nbsp;
            Spent: ₹{totalSpent.toLocaleString()} &nbsp;|&nbsp;
            Remaining: ₹{remaining.toLocaleString()}
          </p>

          {relatedExpenses.length > 0 ? (
            <ul className="space-y-2 max-h-56 overflow-auto">
              {relatedExpenses.map((exp, idx) => (
                <li key={idx} className="flex justify-between p-2 bg-white rounded-md shadow-sm">
                  <span>{exp.name}</span>
                  <span className="text-red-600 font-medium">-₹{exp.amount}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No expenses found for this category.</p>
          )}
        </div>
      )}
    </div>
  );
};


const BalanceChart = ({ user }) => {
  // const expenses = user?.incomeSources;

  const {incomeSources} = useContext(UserContext)
  const expenses=incomeSources;

  if (!expenses || expenses.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">income Breakdown</h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <ChartPieIcon className="h-8 w-8 text-gray-400" />
            </div>
            <p>No income data available</p>
          </div>
        </div>
      </div>
    );
  }
  const chartData = expenses.map((expense, index) => ({
    name: expense.source,
    value: parseInt(expense.amount, 10),
    color: COLORS[index % COLORS.length],
  }));
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-blue-600 font-semibold">
            ₹{data.value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.05) return null; // Don't show labels for slices less than 5%
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Income Breakdown</h3>
        <div className="text-sm text-gray-500">
          Total: ₹{expenses.reduce((sum, exp) => sum + parseInt(exp.amount,10), 0).toLocaleString()}
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={CustomLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <RechartsTooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value, entry) => (
                <span style={{ color: entry.color }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Savings Chart Component
const SavingsChart = ({ budget }) => {
  const savingsPlan = budget?.suggestedSavingsPlan;

  if (!savingsPlan || savingsPlan.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Savings Plan</h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrophyIcon className="h-8 w-8 text-gray-400" />
            </div>
            <p>No savings plan available</p>
          </div>
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-blue-600 font-semibold">
            {data.value}% (₹{data.payload.amount?.toLocaleString() || 0})
          </p>
        </div>
      );
    }
    return null;
  };

  const totalAmount = savingsPlan.reduce(
    (sum, plan) => sum + parseInt(plan.amount, 10),
    0
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Suggested Savings Plan</h3>
        <div className="text-sm text-gray-500">
          Total Allocation: ₹{totalAmount.toLocaleString()}
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={savingsPlan} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="category" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              label={{ value: 'amount', angle: -90, position: 'insideLeft' }}
            />
            <RechartsTooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="amount" 
              fill="#6366f1"
              radius={[4, 4, 0, 0]}
              className="hover:opacity-80 transition-opacity"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};



// Recent Transactions Component
const RecentTransactions = ({ expenses }) => {
  const navigate = useNavigate();
  const { Expenses } = useContext(UserContext);

  if (!Expenses || Expenses.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 w-full max-w-full h-[400px]">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          <button
            onClick={() => navigate('/add-expense')}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            ADD EXPENSE
          </button>
        </div>
        <div className="text-center py-8 text-gray-500 h-[320px] flex flex-col justify-center items-center">
          <CalendarIcon className="h-12 w-12 text-gray-300 mb-3" />
          <p>No transactions found</p>
        </div>
      </div>
    );
  }

  const sortedExpenses = [...Expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 8);

  const getCategoryColor = (category) => {
    const colors = {
      food: 'bg-orange-100 text-orange-700',
      transport: 'bg-blue-100 text-blue-700',
      entertainment: 'bg-purple-100 text-purple-700',
      shopping: 'bg-pink-100 text-pink-700',
      utilities: 'bg-green-100 text-green-700',
      default: 'bg-gray-100 text-gray-700',
    };
    return colors[category] || colors.default;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 w-full max-w-full h-[400px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
        <button
          onClick={() => navigate('/add-expense')}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          ADD EXPENSE
        </button>
      </div>

      <div className="space-y-3 overflow-y-auto h-[320px] pr-2 scrollbar-thin scrollbar-thumb-gray-300">
        {sortedExpenses.map((expense) => (
          <div
            key={expense.id || expense.name}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <ArrowDownRightIcon className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">{expense.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(expense.category)}`}>
                    {expense.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDate(expense.date)}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-red-600">
                -₹{expense.amount.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const { user, setAiParameters, aiParameters, setAiData, token } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localStorage.getItem("AI")) {
          setLoading(false);
          return;
        }
        const { data } = await axios.get("https://budgetly-back-k8l5.onrender.com/api/setup/ai", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data) {
          setAiData(data.budget);
          setAiParameters(data.budget);
          setTimeout(() => setLoading(false), 1000);
        }
      } catch (err) {
        console.error("❌ Error fetching AI setup data:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, [token, setAiParameters, setAiData]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const budget = aiParameters || {};

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar
        navigate={navigate}
        setIsActive={setIsActive}
        isActive={isActive}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isActive ? "lg:ml-10" : "lg:ml-16"
        }`}
      >
        {/* Navbar */}
        <Navbar
          navigate={navigate}
          user={user}
          onMenuToggle={() => setIsActive(!isActive)}
          sidebarOpen={isActive}
        />

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Hero Section */}
            <HeroSection user={user} />

            {/* Main Grid with Swapped Components */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Row 1 */}
              <div className="lg:col-span-1">
                <BudgetCard user={user} />
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ExpenseChart user={user} />
                <BalanceChart user={user} />
              </div>

              {/* Row 2 */}
              <div className="lg:col-span-1">
                <SavingsChart budget={budget} />
              </div>
              <div className="lg:col-span-2">
                <AlertsSection budget={budget} />
              </div>
            </div>

            {/* Recent Transactions */}
            <RecentTransactions user={user} />
          </div>
        </main>
      </div>

      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center z-40"
      >
        <ChatBubbleLeftEllipsisIcon className="h-6 w-6" />
      </button>

      {/* Chat Bot */}
      <ChatBot isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default Dashboard;