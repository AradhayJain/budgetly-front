import React from "react";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./protection/UserProtection";
import InitialSetup from "./pages/Onboarding";
import LogReg from "./protection/LogReg";
import RequireOnboarding from "./protection/RequireBoard";
import AddExpensePage from "./pages/AddExpense";
import ProfilePage from "./pages/GetProfile";
import AddIncomePage from "./pages/AddIncome";
import SupportPage from "./pages/Support";
import AnalyticsPage from "./pages/Analytics";
import BadgesPage from "./pages/Badge";
import ChangeLimitsPage from "./pages/Limits";
import GroupSavingsPage from "./pages/GroupSavings";
import Summaries from "./pages/Summaries";
import GroupChat from "./pages/GroupChat";
import "./pages/style.css"
import LandingPage from "./pages/Landing";



const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LogReg><LandingPage/></LogReg>}/>
        <Route path="/register" element={<LogReg><Register/></LogReg>}/>
        <Route path="/login" element={<LogReg><Login/></LogReg>}/>
        <Route path='/onboard' element={<RequireOnboarding><InitialSetup/></RequireOnboarding>}/>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        <Route path="/Add-Expense" element={<ProtectedRoute><AddExpensePage/></ProtectedRoute>}/>
        <Route path="/get-profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
        <Route path="/add-income" element={<ProtectedRoute><AddIncomePage/></ProtectedRoute>}/>
        <Route path="/Support" element={<ProtectedRoute><SupportPage/></ProtectedRoute>}/>
        <Route path="/Analytics" element={<ProtectedRoute><AnalyticsPage/></ProtectedRoute>}/>
        <Route path="/badges" element={<ProtectedRoute><BadgesPage/></ProtectedRoute>}/>
        <Route path="/limits" element={<ProtectedRoute><ChangeLimitsPage/></ProtectedRoute>}/>
        <Route path="/group-savings" element={<ProtectedRoute><GroupSavingsPage/></ProtectedRoute>}/>
        <Route path="/summaries" element={<ProtectedRoute><Summaries/></ProtectedRoute>}/>
        <Route path="/chat" element={<ProtectedRoute><GroupChat/></ProtectedRoute>}/>

      </Routes>
    </Router>
  )
}

export default App;
