import React, { useState, useEffect } from "react";
import { Eye, EyeOff, User, Mail, Lock, CheckCircle, AlertCircle, Image } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [submit, setSubmit] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [pic, setPic] = useState(null);
    const [preview, setPreview] = useState(null);
    const [type,setType]=useState("student");
    const navigate = useNavigate();
    const {user,token} = useContext(UserContext);

    
    useEffect(() => {
        if (pic) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(pic);
        } else {
            setPreview(null);
        }
    }, [pic]);

    const getPasswordStrength = (pwd) => {
        let strength = 0;
        if (pwd.length >= 6) strength += 1;
        if (/[a-z]/.test(pwd)) strength += 1;
        if (/[A-Z]/.test(pwd)) strength += 1;
        if (/\d/.test(pwd)) strength += 1;
        if (/[\W_]/.test(pwd)) strength += 1;
        return strength;
    };

    const isPasswordValid = (pwd) => {
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
        return regex.test(pwd);
    };

    useEffect(() => {
        setPasswordStrength(getPasswordStrength(password));
        const passwordsMatch = password === confirmPassword;
        const passwordValid = isPasswordValid(password);
        const nameValid = name.trim().length >= 2;
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        setIsDisabled(!(passwordsMatch && passwordValid && nameValid && emailValid));
    }, [password, confirmPassword, name, email]);

    const handleSubmit = async () => {
        console.log("Submitting...");
        setSubmit(true);

        try {
            console.log(type)
            const formData = new FormData();
            
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("type", type);
            if (pic) formData.append("pic", pic);


            const { data } = await axios.post("https://budgetly-back-k8l5.onrender.com/api/users/register", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (data){
                console.log(data);
                setTimeout(() => {
                    setSubmit(false);
                    navigate("/login");
                }, 2000);
            }

            
        } catch (error) {
            setSubmit(false);
            console.error(error);
        }
    };

    const getPasswordStrengthColor = () => {
        if (passwordStrength <= 2) return "bg-red-500";
        if (passwordStrength <= 3) return "bg-yellow-500";
        if (passwordStrength <= 4) return "bg-blue-500";
        return "bg-green-500";
    };

    const getPasswordStrengthText = () => {
        if (passwordStrength <= 2) return "Weak";
        if (passwordStrength <= 3) return "Fair";
        if (passwordStrength <= 4) return "Good";
        return "Strong";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                        <User className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
                    <p className="text-gray-600">Join us today and get started</p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
                    <div className="space-y-6">
                        {/* Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Full Name
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white/50 focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your full name"
                                />
                                {name.trim().length >= 2 && (
                                    <CheckCircle className="absolute right-3 top-3.5 w-5 h-5 text-green-500" />
                                )}
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white/50 focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your email"
                                />
                                {/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                                    <CheckCircle className="absolute right-3 top-3.5 w-5 h-5 text-green-500" />
                                )}
                            </div>
                        </div>
                         {/* type */}
                         <div className="space-y-2">
  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
    <User className="w-4 h-4" />
    Select Role Type
  </label>
  <select
    value={type}
    onChange={(e) => setType(e.target.value)}
    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white/50 focus:ring-2 focus:ring-blue-500"
  >
    <option value="student">Student</option>
    <option value="working professinal">working professinal</option>
  </select>
</div>

                        {/* Profile Picture */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Image className="w-4 h-4" />
                                Upload Profile Picture
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setPic(e.target.files[0])}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white/50 focus:ring-2 focus:ring-blue-500"
                            />
                            {preview && (
                                <div className="mt-2">
                                    <img src={preview} alt="Preview" className="rounded-xl w-24 h-24 object-cover" />
                                </div>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Lock className="w-4 h-4" />
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl bg-white/50 focus:ring-2 focus:ring-blue-500"
                                    placeholder="Create a password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {password && (
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs text-gray-600">
                                        <span>Password strength:</span>
                                        <span className={`font-semibold ${getPasswordStrengthColor().replace("bg-", "text-")}`}>
                                            {getPasswordStrengthText()}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                                            style={{ width: `${(passwordStrength / 5) * 100}%` }}
                                        ></div>
                                    </div>
                                    {!isPasswordValid(password) && (
                                        <p className="text-xs text-red-500 flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" />
                                            Password must contain letters, numbers & special characters
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <Lock className="w-4 h-4" />
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl bg-white/50 focus:ring-2 focus:ring-blue-500"
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                                {password === confirmPassword && confirmPassword && (
                                    <CheckCircle className="absolute right-12 top-3.5 w-5 h-5 text-green-500" />
                                )}
                            </div>
                            {password !== confirmPassword && confirmPassword && (
                                <p className="text-xs text-red-500 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    Passwords do not match
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="button"
                            disabled={isDisabled || submit}
                            onClick={handleSubmit}
                            className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 transform ${
                                isDisabled || submit
                                    ? "bg-gray-300 cursor-not-allowed"
                                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                            }`}
                        >
                            {submit ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Creating Account...
                                </div>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </div>

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an account?{" "}
                            <button
                                onClick={() => navigate("/login")}
                                className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                Sign In
                            </button>
                        </p>
                    </div>
                </div>

                <div className="text-center mt-8 text-sm text-gray-500">
                    By creating an account, you agree to our{" "}
                    <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and{" "}
                    <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                </div>
            </div>
        </div>
    );
};

export default Register;
