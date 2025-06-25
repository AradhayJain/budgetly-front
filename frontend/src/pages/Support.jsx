import React, { useState } from "react";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
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
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import axios from "axios";
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

const SupportPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isActive, setIsActive] = useState(false);
  const [activeItem, setActiveItem] = useState("Support");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://budgetly-back-k8l5.onrender.com/api/support/get-support",
        form,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex">
      {/* Sidebar (inline) */}
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
        <div className="max-w-4xl mx-auto py-10 px-4">
          <h2 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">
            Contact & Support
          </h2>
          <p className="text-gray-600 text-center mb-10">
            Have questions, feedback, or suggestions? We’re here to help. Reach out to us anytime.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Your Name</label>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Your Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <EnvelopeIcon className="h-6 w-6 text-blue-600" />
                <span className="text-gray-700 text-sm">aradhayjain2006@gmail.com</span>
              </div>
              <div className="flex items-center gap-4">
                <PhoneIcon className="h-6 w-6 text-blue-600" />
                <span className="text-gray-700 text-sm">+91-8595132781</span>
              </div>
              <div className="flex items-center gap-4">
                <MapPinIcon className="h-6 w-6 text-blue-600" />
                <span className="text-gray-700 text-sm">India</span>
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Connect with me</h3>
                <div className="flex gap-4 text-xl">
                  <a href="https://github.com/AradhayJain" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
                    <FaGithub />
                  </a>
                  <a href="https://www.linkedin.com/in/AradhayJain2006/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
                    <FaLinkedin />
                  </a>
                  <a href="https://www.instagram.com/aradhay_2006/" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SupportPage;
