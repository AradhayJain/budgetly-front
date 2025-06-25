import React, { useState } from "react";
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
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
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

const Summaries = () => {
  const [isActive, setIsActive] = useState(false);
  const [activeItem, setActiveItem] = useState("Summaries");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex">
      {/* Sidebar (inline code) */}
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
            ${isActive ? 'w-64' : 'w-16'}
            ${isActive ? 'translate-x-0' : '-translate-x-full'}
            lg:relative lg:translate-x-0 lg:w-${isActive ? "64" : "16"}
          `}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className={`flex items-center gap-3 ${!isActive && 'lg:justify-center'}`}>
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
      <main
        className={`flex-1 transition-all duration-200 ml-0 lg:ml-${isActive ? "64" : "16"}`}
      >
        <div className="min-h-screen flex items-center justify-center px-4 py-10">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center border border-blue-100">
            <div className="flex justify-center mb-4">
              <ExclamationCircleIcon className="h-12 w-12 text-blue-500" />
            </div>
            <h2 className="text-xl font-semibold text-blue-700 mb-2">
              No Summaries Yet
            </h2>
            <p className="text-sm text-gray-600">
              You haven’t generated any summaries for this month. Once you start
              spending, your insights will appear here.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Summaries;
