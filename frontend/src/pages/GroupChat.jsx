import React, { useContext, useState, useEffect, useRef } from "react";
import {
  Plus, Users, Receipt, Trash2, DollarSign, Coffee,
  Home, Car, ShoppingBag, MapPin, X
} from "lucide-react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import { nanoid } from "nanoid";

const socket = io("https://budgetly-back-k8l5.onrender.com");

const categoryIcons = {
  food: Coffee,
  accommodation: Home,
  transport: Car,
  entertainment: MapPin,
  business: Receipt,
  shopping: ShoppingBag,
  other: DollarSign,
};

const GroupChat = () => {
  const { user, allChats, token ,setAllChats} = useContext(UserContext);
  const [activeGroup, setActiveGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("chat");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [expenseForm, setExpenseForm] = useState({
    name: "",
    amount: "",
    paidBy: "",
  });
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);


  // useEffect(()=>{
  //   const fetchChats = async () => {
  //     try {
  //       const { data } = await axios.get("https://budgetly-back-k8l5.onrender.com/api/group/all", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       if (data) {
  //         setAllChats(data.chats);
  //         console.log("chats found");
  //         console.log(data.chats)
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchChats();
  // },[allChats])

  useEffect(() => {
    if (allChats?.length > 0) {
      setActiveGroup(allChats[0]);
      setMessages([]);
    }
  }, [allChats]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!activeGroup?._id) return;
      try {
        const { data } = await axios.get("https://budgetly-back-k8l5.onrender.com/api/group/get-messages", {
          params: { groupId: activeGroup._id },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (data?.messages) {
          setMessages(data.messages);
        }
      } catch (err) {
        console.error("Fetch messages error:", err);
      }
    };
    fetchMessages();
  }, [activeGroup]);

  useEffect(() => {
    if (!activeGroup) return;
    socket.emit("join-group", activeGroup._id);
    setMessages([]);
    socket.on("group-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      socket.off("group-message");
    };
  }, [activeGroup]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeGroup) return;
    const msg = {
      _id: nanoid(),
      user: user.name,
      userId: user._id,
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    try {
      const { data } = await axios.post("https://budgetly-back-k8l5.onrender.com/api/group/send-message", { groupId: activeGroup._id, message: msg }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data) {
        socket.emit("group-message", { groupId: activeGroup._id, message: msg });
      }
    } catch (err) {
      console.log(err);
    }
    setNewMessage("");
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    const newExpenseAmount = parseFloat(expenseForm.amount);
    const currentTotal = (activeGroup?.Expenses || []).reduce((acc, e) => acc + parseFloat(e.amount), 0);
    const groupBudget = activeGroup?.Budget || 0;

    if (currentTotal + newExpenseAmount > groupBudget) {
      setError("Adding this expense would exceed the group's budget.");
      return;
    }
    const newExpense = {
      _id: nanoid(),
      name: expenseForm.name,
      amount: expenseForm.amount,
      paidBy: expenseForm.paidBy,
      date: new Date().toISOString().split("T")[0],
    };
    try {
      const { data } = await axios.post("https://budgetly-back-k8l5.onrender.com/api/group/add-expense", {
        groupId: activeGroup._id,
        newExpense,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data) {
        const updatedExpenses = [...(activeGroup?.Expenses || []), newExpense];
        const updatedGroup = { ...activeGroup, Expenses: updatedExpenses };
        setActiveGroup(updatedGroup);

        // Also update the allChats state with the updated group
        const updatedChats = allChats.map((g) =>
          g._id === updatedGroup._id ? updatedGroup : g
        );
        setAllChats(updatedChats);

        setExpenseForm({ name: "", amount: "", paidBy: "" });
        setShowAddExpense(false);
        setError("");
      }
    } catch (err) {
      console.log("Expense error:", err);
    }
  };

  const handleDeleteExpense = (id) => {
    const updated = (activeGroup?.Expenses || []).filter((e) => e._id !== id);
    setActiveGroup({ ...activeGroup, Expenses: updated });
  };

  if (!activeGroup) return <div className="p-4">No group chats found.</div>;

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-slate-50">
      <div className={`flex flex-col justify-between transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:relative top-0 left-0 z-30 w-72 bg-white border-r h-full shadow-md transition-transform duration-200 overflow-y-auto`}>
        <div className="py-4 px-6 flex justify-between md:hidden">
          <h2 className="text-lg font-bold">Your Groups</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <Trash2 className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-4 space-y-3">
          {allChats.map((group) => {
            const spent = (group.Expenses || []).reduce((acc, e) => acc + parseFloat(e.amount), 0);
            return (
              <div key={group._id} onClick={() => { setActiveGroup(group); setSidebarOpen(false); }} className={`p-4 border rounded-lg cursor-pointer ${group._id === activeGroup._id ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"}`}>
                <h3 className="font-semibold text-lg text-blue-800">{group.chatName}</h3>
                <p className="text-sm text-gray-500">{group.members?.map((m) => m.name).join(", ")}</p>
                <p className="text-xs mt-1">Budget: ₹{group.Budget || 0}, Spent: ₹{spent}</p>
              </div>
            );
          })}
        </div>
        <div className="mb-10 ml-10">
          <button className="bg-blue-300 rounded-2xl p-3" onClick={() => navigate("/dashboard")}>Return to Dashboard</button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-white border-b">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 bg-gray-100 rounded" onClick={() => setSidebarOpen(true)}>
              <Users className="w-6 h-6 text-blue-600" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{activeGroup.chatName}</h2>
              <p className="text-sm text-gray-500">{activeGroup.members?.map((m) => m.name).join(", ")}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {["chat", "expenses"].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded ${activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
            ))}
          </div>
        </div>

        <div className="flex-1 p-4 overflow-auto">
          {activeTab === "chat" ? (
            <div className="flex flex-col h-full">
              <div className="flex-1 space-y-4 overflow-y-auto">
                {messages.map((msg) => (
                  <div key={msg._id} className={`p-3 rounded-lg w-fit max-w-[80%] ${msg.userId === user._id ? "ml-auto bg-blue-600 text-white" : "bg-gray-100 text-gray-900"}`}>
                    <div className="text-xs font-semibold">{msg.user}</div>
                    <div className="text-sm">{msg.message}</div>
                    <div className="text-[10px] mt-1 text-right">{msg.timestamp}</div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <form onSubmit={handleSendMessage} className="mt-4 flex gap-2 border-t pt-4">
                <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." className="flex-1 p-3 border rounded" />
                <button className="bg-blue-600 text-white px-4 rounded">Send</button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Expenses</h3>
                <button onClick={() => setShowAddExpense(true)} className="flex items-center gap-1 bg-blue-500 text-white px-3 py-2 rounded">
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
              <div className="grid gap-4">
                {(activeGroup.Expenses || []).map((exp) => {
                  const Icon = categoryIcons[exp.category] || DollarSign;
                  return (
                    <div key={exp._id} className="flex justify-between items-center bg-white p-4 rounded shadow">
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-semibold">{exp.name}</p>
                          <p className="text-sm text-gray-500">₹{parseFloat(exp.amount)} • Paid by {exp.paidBy}</p>
                        </div>
                      </div>
                      
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {showAddExpense && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add Expense</h2>
              <button onClick={() => setShowAddExpense(false)}>
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <form onSubmit={handleAddExpense} className="space-y-4">
              <input value={expenseForm.name} onChange={(e) => setExpenseForm({ ...expenseForm, name: e.target.value })} placeholder="Expense name" className="w-full p-2 border rounded" required />
              <input value={expenseForm.amount} onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })} placeholder="Amount" className="w-full p-2 border rounded" required />
              <input value={expenseForm.paidBy} onChange={(e) => setExpenseForm({ ...expenseForm, paidBy: e.target.value })} placeholder="Paid by" className="w-full p-2 border rounded" required />
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupChat;