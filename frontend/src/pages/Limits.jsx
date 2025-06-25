import React, { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  PencilSquareIcon,
} from "@heroicons/react/24/solid";

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

const ChangeLimitsPage = () => {
  const { user, setUser, token, login } = useContext(UserContext);
  const [editIndex, setEditIndex] = useState(null);
  const [editedLimit, setEditedLimit] = useState({ title: "", amount: "" });

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditedLimit(user.PrimarySpendsLimits[index]);
  };

  const handleSaveClick = async () => {
    const updatedLimits = [...user.PrimarySpendsLimits];
    updatedLimits[editIndex] = editedLimit;

    try {
      const { data } = await axios.post(
        "https://budgetly-back-k8l5.onrender.com/api/users/change-limits",
        { PrimarySpendsLimits: updatedLimits[editIndex] },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data) {
        login(data.user, token);
        setEditIndex(null);
      }
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [activeItem, setActiveItem] = useState("Change Limits");

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
        <div className="max-w-3xl mx-auto p-6 mt-10">
          <h2 className="text-2xl font-bold text-blue-700 mb-6">Manage Spending Limits</h2>

          {user?.PrimarySpendsLimits?.length === 0 ? (
            <p className="text-gray-500">No spending limits found.</p>
          ) : (
            <div className="space-y-4">
              {user.PrimarySpendsLimits.map((limit, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border p-4 rounded-lg shadow-sm bg-blue-50"
                >
                  {editIndex === index ? (
                    <>
                      <input
                        type="text"
                        className="w-1/2 px-3 py-2 border border-gray-300 rounded"
                        value={editedLimit.title}
                        onChange={(e) =>
                          setEditedLimit({ ...editedLimit, title: e.target.value })
                        }
                      />
                      <input
                        type="number"
                        className="w-1/4 px-3 py-2 border border-gray-300 rounded"
                        value={editedLimit.amount}
                        onChange={(e) =>
                          setEditedLimit({ ...editedLimit, amount: e.target.value })
                        }
                      />
                      <button
                        onClick={handleSaveClick}
                        className="ml-2 bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="font-medium text-gray-800">{limit.title}</p>
                        <p className="text-sm text-gray-600">₹{limit.amount}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEditClick(index)}>
                          <PencilSquareIcon className="h-5 w-5 text-blue-500" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ChangeLimitsPage;
