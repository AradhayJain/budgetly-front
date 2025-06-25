import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Eye, EyeOff, Mail, Lock, LogIn, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate=useNavigate();
    const {user,token,login} = useContext(UserContext);
    
    
    
    const isDisabled = false;

    

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Your original handleSubmit function with UI improvements
    const handleSubmit = async () => {
        if (!email || !password) {
            toast.error("Please fill in all fields.");
            return;
        }

        try {
            const { data } = await axios.post("https://budgetly-back-k8l5.onrender.com/api/users/login", {
                email,
                password,
            });

            if (data) {
                console.log(data.user)
                login(data.user,data.token);
                setSubmit(true);
                toast.success("Login successful");
                
            }
        } catch (err) {
            console.error(err);
            toast.error("Invalid credentials or server error.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <ToastContainer />
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                        <LogIn className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                    <p className="text-gray-600">Sign in to continue to your account</p>
                </div>

                {/* Form Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
                    <div className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    type="email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                                    placeholder="Enter your email"
                                />
                                {validateEmail(email) && (
                                    <CheckCircle className="absolute right-3 top-3.5 w-5 h-5 text-green-500" />
                                )}
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Lock className="w-4 h-4" />
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    type={showPassword ? "text" : "password"}
                                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-600">Remember me</span>
                            </label>
                            <button
                                type="button"
                                onClick={() => navigate('/forgot-password')}
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Forgot password?
                            </button>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center items-center w-full">
                            {!submit ? (
                                <button
                                    disabled={isDisabled}
                                    onClick={handleSubmit}
                                    className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 transform ${
                                        isDisabled
                                            ? "bg-gray-300 cursor-not-allowed"
                                            : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                                    }`}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <LogIn className="w-5 h-5" />
                                        Sign In
                                    </div>
                                </button>
                            ) : (
                                <div className="w-full flex justify-center items-center py-3">
                                    <div className="flex items-center gap-2">
                                        <div className="animate-spin w-6 h-6 border-4 rounded-full border-t-transparent border-blue-500"></div>
                                        <span className="text-blue-600 font-medium">Signing In...</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Register Link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            New here?{" "}
                            <button
                                onClick={() => navigate("/")}
                                className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                Sign Up
                            </button>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-sm text-gray-500">
                    Protected by advanced security measures
                </div>
            </div>
        </div>
    );
};

export default Login;