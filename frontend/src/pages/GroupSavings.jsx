import React, { useState, useEffect, useContext } from "react";
import {
  UserIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  PlusCircleIcon,
  ArrowTrendingUpIcon,
  Bars3Icon,
  ChartPieIcon,
  UsersIcon,
  CheckBadgeIcon,
  ChartBarIcon,
  AdjustmentsHorizontalIcon,
  DocumentChartBarIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

let debounceTimeout;

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
const GroupSavingsPage = () => {
  const { user, token, setAllChats, allChats } = useContext(UserContext);
  const [allUsers, setAllUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [activeItem, setActiveItem] = useState("Group Savings");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`https://budgetly-back-k8l5.onrender.com/api/users/all${search ? `?search=${search}` : ""}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllUsers(res.data || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(fetchUsers, 300);

    return () => clearTimeout(debounceTimeout);
  }, [search]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await axios.get("https://budgetly-back-k8l5.onrender.com/api/group/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (data) {
          setAllChats(data.chats);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchChats();
  }, []);

  const addUser = (user) => {
    setSelectedUsers((prev) => [...prev, user]);
  };

  const removeUser = (id) => {
    setSelectedUsers((prev) => prev.filter((u) => u._id !== id));
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      alert("Please enter a group name.");
      return;
    }
    if (selectedUsers.length === 0) {
      alert("Please select at least one user.");
      return;
    }

    try {
      const finalSelectedUsers = [user, ...selectedUsers];
      console.log(selectedUsers);
      const res = await axios.post(
        "https://budgetly-back-k8l5.onrender.com/api/group/create",
        {
          name: groupName.trim(),
          users: finalSelectedUsers.map((u) => u._id),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedUsers([]);
      setGroupName("");
      setAllChats((prev) => [...prev, res.data.chat]);
      alert("Group created successfully!");
    } catch (err) {
      console.error("Failed to create group:", err);
      alert("Failed to create group");
    }
  };

  const handleDelete = async (chatId) => {
    try {
      const { data } = await axios.post(
        "https://budgetly-back-k8l5.onrender.com/api/group/delete",
        { chatId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data) {
        setAllChats(allChats.filter((chat) => chat._id !== chatId));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filteredUsers = allUsers.filter(
    (u) => !selectedUsers.find((s) => s._id === u._id)
  );

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
        <div className="max-w-4xl mx-auto py-10 px-4">
          <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
            Create Group Savings
          </h2>

          <input
            type="text"
            placeholder="Enter group name"
            className="w-full mb-6 px-4 py-3 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />

          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search users by name or email..."
              className="w-full px-4 py-3 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <MagnifyingGlassIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          </div>

          {selectedUsers.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-700 mb-2">Selected Members:</h4>
              <div className="flex flex-wrap gap-3">
                {selectedUsers.map((user) => (
                  <div
                    key={user._id}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full flex items-center gap-2 shadow"
                  >
                    <UserIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">{user.name}</span>
                    <XMarkIcon
                      onClick={() => removeUser(user._id)}
                      className="h-4 w-4 text-red-500 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl p-4 shadow border border-blue-100 max-h-[300px] overflow-y-auto">
            <h4 className="text-md font-semibold text-gray-600 mb-3">Available Users:</h4>
            {filteredUsers.length === 0 ? (
              <p className="text-sm text-gray-500">No users found.</p>
            ) : (
              filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between border-b py-2 last:border-none"
                >
                  <div className="flex items-center gap-3">
                    <UserIcon className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700 text-sm">{user.name}</span>
                  </div>
                  <button
                    onClick={() => addUser(user)}
                    className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <PlusCircleIcon className="h-4 w-4" />
                    Add
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleCreateGroup}
              className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
            >
              Create Group
            </button>
          </div>

          {allChats && allChats.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-blue-700 mb-4 text-center">Your Groups</h3>
              <div className="grid gap-6 md:grid-cols-2">
                {allChats.map((chat) => (
                  <div
                    key={chat._id}
                    onClick={() => navigate("/chat")}
                    className="bg-white p-4 rounded-xl shadow border border-blue-100 flex flex-col gap-2"
                  >
                    <div className="w-full flex justify-between">
                      <h4 className="text-xl font-semibold text-blue-700">{chat.chatName}</h4>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(chat._id);
                        }}
                        className="p-2 bg-blue-300 rounded-xl text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">
                      {chat.members.length} member{chat.members.length > 1 ? "s" : ""}
                    </p>
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                      {chat.members.map((member) => (
                        <span
                          key={member._id}
                          className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full whitespace-nowrap"
                        >
                          {member.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default GroupSavingsPage;
