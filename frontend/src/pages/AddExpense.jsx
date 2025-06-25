import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext"; // Adjust path as needed
import axios from "axios";
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
  DocumentChartBarIcon,
  AdjustmentsHorizontalIcon
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

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

// Sidebar component
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
        ${isActive ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 lg:w-${isActive ? "64" : "16"}
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
          className="p-1 rounded-lg hover:bg-gray-100 absolute  left-20 transition-colors lg:hidden"
        >
          {/* {isActive ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />} */}
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


// Expense Table
const ExpenseTable = ({ expenses }) => (
  <div className="overflow-x-auto mt-8">
    <table className="min-w-full bg-white rounded-xl shadow-md">
      <thead>
        <tr className="bg-blue-100 text-blue-700">
          <th className="py-3 px-4 text-left font-semibold">Name</th>
          <th className="py-3 px-4 text-left font-semibold">Amount (₹)</th>
          <th className="py-3 px-4 text-left font-semibold">Category</th>
          <th className="py-3 px-4 text-left font-semibold">Date</th>
        </tr>
      </thead>
      <tbody>
        {(!expenses || expenses.length === 0) ? (
          <tr>
            <td colSpan={4} className="py-4 text-center text-gray-400">
              No expenses yet.
            </td>
          </tr>
        ) : (
          expenses.map((exp, idx) => (
            <tr
              key={idx}
              className={`${
                idx % 2 === 0 ? "bg-blue-50" : "bg-white"
              } hover:bg-blue-200/60 transition`}
            >
              <td className="py-2 px-4">{exp.name}</td>
              <td className="py-2 px-4 font-semibold text-red-600">
                ₹{exp.amount}
              </td>
              <td className="py-2 px-4">{exp.category}</td>
              <td className="py-2 px-4">{exp.date.split('T')[0]}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

// Add Expense Form
const AddExpenseForm = ({ categories, onNewCategory }) => {
  
  const {token,setExpenses,Expenses,user}=useContext(UserContext)
  const [form, setForm] = useState({
    name: "",
    amount: "",
    category: "",
    date: new Date().toISOString().slice(0, 10),
  });
  const [error, setError] = useState("");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ title: "", amount: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleNewCategoryChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, amount, category, date } = form;
  
    if (!name || !amount || !category) {
      setError("Please fill all fields.");
      return;
    }
  
    if (isNaN(amount) || Number(amount) <= 0) {
      setError("Amount must be a positive number.");
      return;
    }
  
    // Check if the category is in the existing list
    if (!categories.includes(category)) {
      setShowCategoryModal(true);
      return;
    }
  
    // Monthly total check
    const totalSpent = Expenses.reduce((sum, exp) => {
      const expenseMonth = new Date(exp.date).getMonth();
      const currentMonth = new Date().getMonth();
      return expenseMonth === currentMonth ? sum + Number(exp.amount) : sum;
    }, 0);
  
    if (totalSpent + Number(amount) > user.monthlyBudget) {
      setError("Adding this expense exceeds your monthly budget.");
      return;
    }
  
    // Category limit check
    const categoryLimitObj = user.PrimarySpendsLimits.find(
      (limit) => limit.title.toLowerCase() === category.toLowerCase()
    );
  
    if (categoryLimitObj) {
      const spentInCategory = Expenses.reduce((sum, exp) => {
        return (
          exp.category.toLowerCase() === category.toLowerCase()
            ? sum + Number(exp.amount)
            : sum
        );
      }, 0);
  
      if (spentInCategory + Number(amount) > categoryLimitObj.amount) {
        setError("Adding this expense exceeds your category limit.");
        return;
      }
    }
  
    try {
      const { data } = await axios.post(
        "https://budgetly-back-k8l5.onrender.com/api/expense/add-expense",
        {
          name,
          amount: Number(amount),
          category,
          date,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (data) {
        setExpenses((prevExpenses) => [...prevExpenses, data.expense]);
      }
  
      setForm({
        name: "",
        amount: "",
        category: "",
        date: new Date().toISOString().slice(0, 10),
      });
    } catch (err) {
      console.log(err);
      setError("Failed to add expense. Please try again.");
    }
  };
  

  return (
    <>
      <form
        className="bg-white rounded-xl shadow-md p-6 sm:p-8 w-full max-w-lg mx-auto mt-8"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
          <PlusCircleIcon className="h-7 w-7 text-blue-500" />
          Add New Expense
        </h2>
        {error && (
          <div className="mb-4 text-red-600 bg-red-50 rounded p-2">{error}</div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Expense Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. Groceries"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Amount (₹)</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. 500"
            min="1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. Food"
            list="category-options"
          />
          <datalist className="bg-white" id="category-options">
            {categories.map((cat, idx) => (
              <option key={idx} value={cat} />
            ))}
          </datalist>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition"
        >
          Add Expense
        </button>
      </form>

      {/* New Category Modal */}
      {/* {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Add New Category</h3>
            <div className="mb-3">
              <label className="block text-gray-700 mb-1">Category Title</label>
              <input
                type="text"
                name="title"
                value={newCategory.title}
                onChange={handleNewCategoryChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Spending Limit (₹)</label>
              <input
                type="number"
                name="amount"
                value={newCategory.amount}
                onChange={handleNewCategoryChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setShowCategoryModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleNewCategorySubmit}
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};

// Main Add Expense Page
const AddExpensePage = () => {
  const { aiParameters, categories, Expenses } = useContext(UserContext);
  const [isActive, setIsActive] = useState(false);
  const [activeItem, setActiveItem] = useState("Add Expense");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-blue-50">
      {/* Sidebar */}
      <Sidebar
        navigate={navigate}
        isActive={isActive}
        setIsActive={setIsActive}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 lg:ml-64">
        {/* Mobile Top Bar */}
        <div className="flex justify-between items-center lg:hidden mb-4">
          <h1 className="text-2xl font-bold text-blue-700">Add Expense</h1>
          <button onClick={() => setIsActive(true)}>
            <Bars3Icon className="h-6 w-6 text-blue-600" />
          </button>
        </div>

        {/* Form */}
        <AddExpenseForm categories={categories} />

        {/* Expense Table */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
            <CurrencyRupeeIcon className="h-6 w-6 text-blue-500" />
            Your Current Expenses
          </h2>
          <div className="overflow-x-auto">
            <ExpenseTable expenses={Expenses} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExpensePage;
