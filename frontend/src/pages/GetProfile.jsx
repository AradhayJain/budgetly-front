import React, { useState, useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  User,
  Mail,
  DollarSign,
  CheckCircle,
  XCircle,
  Edit3,
  LogOut,
  Camera,
  Bell,
  Shield,
  Star,
  Settings,
  TrendingUp,
  Wallet,
  ArrowLeftIcon,
  Save,
  X,
} from 'lucide-react';

const ProfilePage = () => {
  const { user, incomeSources, Expenses, logout ,login,token} = useContext(UserContext);
  const [showSettings, setShowSettings] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [budget, setBudget] = useState(user.monthlyBudget);
  const [error, setError] = useState('');
  const monthlyBudget = user?.monthlyBudget;
  const navigate = useNavigate();

  const totalIncome = incomeSources?.reduce((sum, i) => sum + Number(i.amount), 0) || 0;
  const totalExpenses = Expenses?.reduce((sum, e) => sum + Number(e.amount), 0) || 0;
  const usagePercent = monthlyBudget > 0 ? (totalExpenses / monthlyBudget) * 100 : 0;

  const handleLogout = () => logout();

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setName(user.name);
    setEmail(user.email);
    setBudget(user.monthlyBudget);
    setError('');
  };

  const handleSaveProfile = async () => {
    if (budget > totalIncome) {
      setError('Monthly budget cannot exceed total income.');
      return;
    }

    try {
      const {data} = await axios.put('https://budgetly-back-k8l5.onrender.com/api/users/edit-profile', {
        name,
        email,
        monthlyBudget: budget,
      },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if(data){
        login(data.updatedUser,token);
      }

      // If budget changed, call AI insights generation
      // if (budget !== user.monthlyBudget) {
      //   await axios.post('https://budgetly-back-k8l5.onrender.com/api/ai/generate-insights', { newBudget: budget });
      // }

      // Optionally refresh page or user context
      alert('Profile updated successfully');
      setEditMode(false);
    } catch (err) {
      console.error(err);
      alert('Something went wrong while saving profile.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="mb-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-blue-700 font-semibold hover:underline text-sm sm:text-base"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Back to Dashboard
        </button>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 pt-4">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
            Your Profile
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">Manage your account and financial insights</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-6 border border-gray-100">
          <div className="h-28 sm:h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative">
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Settings size={20} />
              </button>
            </div>
          </div>

          <div className="relative px-4 sm:px-8 pb-8">
            {/* Avatar and buttons */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
              <div className="relative -mt-16 flex flex-col items-center sm:items-start">
                <div className="relative">
                  <img
                    src={user.pic}
                    alt={user.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-2xl object-cover"
                  />
                  <button className="absolute bottom-1 right-1 bg-blue-500 text-white p-2 rounded-full cursor-not-allowed opacity-50">
                    <Camera size={14} />
                  </button>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mt-2">{user.name}</h2>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                </div>
              </div>

              <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-0 flex-wrap justify-center sm:justify-end">
                {!editMode ? (
                  <>
                    <button
                      onClick={handleEditProfile}
                      className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 text-sm sm:text-base"
                    >
                      <Edit3 size={16} />
                      Edit Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 text-sm sm:text-base"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 text-sm sm:text-base"
                    >
                      <Save size={16} />
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gray-100 hover:bg-red-100 text-gray-700 hover:text-red-600 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 text-sm sm:text-base"
                    >
                      <X size={16} />
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Error Popup */}
            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-lg mb-4">
                {error}
              </div>
            )}

            {/* Editable Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-500" />
                  Personal Information
                </h3>
                <div className="space-y-3">
                  <InfoItem
                    icon={Mail}
                    label="Email"
                    value={
                      editMode ? (
                        <input
                          className="border px-2 py-1 rounded text-sm"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      ) : (
                        user.email
                      )
                    }
                  />
                  <InfoItem
                    icon={user.onboardingCompleted ? CheckCircle : XCircle}
                    label="Onboarding Status"
                    value={user.onboardingCompleted ? 'Completed' : 'Pending'}
                    valueClass={user.onboardingCompleted ? 'text-green-600' : 'text-orange-600'}
                  />
                  <InfoItem
                    icon={User}
                    label="Name"
                    value={
                      editMode ? (
                        <input
                          className="border px-2 py-1 rounded text-sm"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      ) : (
                        user.name
                      )
                    }
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-green-500" />
                  Financial Overview
                </h3>

                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">Monthly Budget</span>
                      <span className="text-lg font-bold text-blue-600">
                        {editMode ? (
                          <input
                            type="number"
                            className="border px-2 py-1 rounded text-sm w-28"
                            value={budget}
                            onChange={(e) => setBudget(Number(e.target.value))}
                          />
                        ) : (
                          `₹${monthlyBudget?.toLocaleString()}`
                        )}
                      </span>
                    </div>
                    {!editMode && (
                      <>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
                            style={{ width: `${Math.min(usagePercent, 100)}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          ₹{totalExpenses.toLocaleString()} spent ({usagePercent.toFixed(1)}%)
                        </p>
                      </>
                    )}
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">Total Income</span>
                      <span className="text-lg font-bold text-green-600">
                        ₹{totalIncome.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <StatCard
                icon={TrendingUp}
                title="This Month"
                value={`₹${totalExpenses.toLocaleString()}`}
                subtitle="Total Expenses"
                color="blue"
              />
              <StatCard
                icon={DollarSign}
                title="Remaining"
                value={`₹${(monthlyBudget - totalExpenses).toLocaleString()}`}
                subtitle="Budget Left"
                color="green"
              />
              <StatCard
                icon={Shield}
                title="Account"
                value="Secure"
                subtitle="2FA Enabled"
                color="purple"
              />
            </div>
          </div>
        </div>

        {/* Quick Settings */}
        {showSettings && (
          <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-gray-600" />
              Quick Settings
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SettingItem icon={Bell} title="Notifications" description="Manage your notification preferences" />
              <SettingItem icon={Shield} title="Security" description="Update password and 2FA settings" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable components
const InfoItem = ({ icon: Icon, label, value, valueClass = 'text-gray-800' }) => (
  <div className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
    <div className="flex items-center gap-3">
      <Icon className="w-4 h-4 text-gray-500" />
      <span className="text-sm font-medium text-gray-600">{label}</span>
    </div>
    <span className={`text-sm font-semibold ${valueClass}`}>{value}</span>
  </div>
);

const StatCard = ({ icon: Icon, title, value, subtitle, color }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-indigo-500 text-blue-600',
    green: 'from-green-500 to-emerald-500 text-green-600',
    purple: 'from-purple-500 to-pink-500 text-purple-600',
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg bg-gradient-to-r ${colorClasses[color].split(' ').slice(0, 2).join(' ')} text-white`}>
          <Icon size={16} />
        </div>
        <span className="text-sm font-medium text-gray-600">{title}</span>
      </div>
      <div className={`text-xl font-bold ${colorClasses[color].split(' ')[2]}`}>{value}</div>
      <div className="text-xs text-gray-500">{subtitle}</div>
    </div>
  );
};

const SettingItem = ({ icon: Icon, title, description }) => (
  <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-all duration-200 hover:scale-105">
    <div className="p-2 bg-gray-100 rounded-lg">
      <Icon className="w-5 h-5 text-gray-600" />
    </div>
    <div>
      <h4 className="font-medium text-gray-800">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

export default ProfilePage;
