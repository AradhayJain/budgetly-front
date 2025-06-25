import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { UserContext } from "../Context/UserContext";

const InitialSetup = () => {
  const navigate = useNavigate();
  const { login, token } = useContext(UserContext);

  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [incomeSources, setIncomeSources] = useState([{ source: "", amount: "" }]);
  const [PrimarySpendsLimits, setPrimarySpendsLimits] = useState([{ title: "", amount: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleAdd = (setter, item) => setter((prev) => [...prev, item]);

  const handleChange = (index, field, value, state, setter) => {
    const updated = [...state];
    updated[index][field] = value;
    setter(updated);
  };

  const handleSubmit = async () => {
    const totalLimits = PrimarySpendsLimits.reduce((sum, e) => sum + Number(e.amount || 0), 0);

    if (
      !monthlyBudget ||
      incomeSources.some((e) => !e.source || !e.amount) ||
      PrimarySpendsLimits.some((e) => !e.title || !e.amount)
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    if (totalLimits > monthlyBudget) {
      setShowWarning(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const { data } = await axios.post(
        "https://budgetly-back-k8l5.onrender.com/api/setup",
        { monthlyBudget, incomeSources, PrimarySpendsLimits },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data) {
        login(data.user, token);
        toast.success("Setup completed successfully!");
        setTimeout(() => navigate("/dashboard"), 3000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save setup. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100 px-4 py-8">
      <ToastContainer />
      <div className="bg-white shadow-xl rounded-3xl p-6 sm:p-8 w-full max-w-2xl">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">Initial Financial Setup</h2>

        {/* Budget */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Budget (₹)</label>
          <input
            type="number"
            value={monthlyBudget}
            onChange={(e) => setMonthlyBudget(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your monthly budget"
          />
        </div>

        {/* Income Sources */}
        <div className="mb-6">
          <h3 className="text-md font-semibold text-gray-800 mb-2">Income Sources</h3>
          {incomeSources.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-4 mb-3">
              <input
                type="text"
                value={item.source}
                onChange={(e) => handleChange(index, "source", e.target.value, incomeSources, setIncomeSources)}
                placeholder="Source (e.g., Job, Freelance)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
              />
              <input
                type="number"
                value={item.amount}
                onChange={(e) => handleChange(index, "amount", e.target.value, incomeSources, setIncomeSources)}
                placeholder="Amount ₹"
                className="w-full sm:w-40 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
              />
            </div>
          ))}
          <button
            onClick={() => handleAdd(setIncomeSources, { source: "", amount: "" })}
            className="text-blue-600 hover:underline text-sm mt-1"
          >
            + Add another source
          </button>
        </div>

        {/* Spend Limits */}
        <div className="mb-4">
          <h3 className="text-md font-semibold text-gray-800 mb-2">Primary Monthly Spends Limits</h3>
          {PrimarySpendsLimits.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-4 mb-3">
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleChange(index, "title", e.target.value, PrimarySpendsLimits, setPrimarySpendsLimits)}
                placeholder="Spend Category (e.g., Rent, Food)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
              />
              <input
                type="number"
                value={item.amount}
                onChange={(e) => handleChange(index, "amount", e.target.value, PrimarySpendsLimits, setPrimarySpendsLimits)}
                placeholder="Amount ₹"
                className="w-full sm:w-40 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
              />
            </div>
          ))}
          <button
            onClick={() => handleAdd(setPrimarySpendsLimits, { title: "", amount: "" })}
            className="text-blue-600 hover:underline text-sm mt-1"
          >
            + Add another spend
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 mt-6 ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-[1.01] shadow-lg"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Complete Setup"}
        </button>
      </div>

      {/* Warning Modal */}
      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Budget Mismatch Detected
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              The total of your category limits (
              <span className="font-semibold text-red-500">
                ₹{PrimarySpendsLimits.reduce((sum, e) => sum + Number(e.amount || 0), 0)}
              </span>
              ) exceeds your monthly budget (
              <span className="font-semibold text-blue-600">₹{monthlyBudget}</span>).
              Please increase your budget or reduce some category limits.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowWarning(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const total = PrimarySpendsLimits.reduce((sum, e) => sum + Number(e.amount || 0), 0);
                  setMonthlyBudget(total);
                  setShowWarning(false);
                  toast.info("Monthly budget updated to match total limits.");
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                Set Budget to ₹
                {PrimarySpendsLimits.reduce((sum, e) => sum + Number(e.amount || 0), 0)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InitialSetup;
