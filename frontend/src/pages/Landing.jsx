import React, { useState, useEffect } from "react";
import { 
  DollarSign, 
  TrendingUp, 
  Shield, 
  Users, 
  Target, 
  Award, 
  BarChart3, 
  PieChart, 
  Smartphone, 
  Clock, 
  CheckCircle, 
  Star,
  ArrowRight,
  Zap,
  Brain,
  Globe,
  Sparkles,
  Heart
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate=useNavigate()

  const [animatedStats, setAnimatedStats] = useState({
    users: 0,
    saved: 0,
    transactions: 0,
    categories: 0
  });

  // Animate statistics on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats({
        users: 50000,
        saved: 2500000,
        transactions: 1200000,
        categories: 25
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Insights",
      description: "Smart categorization automatically organizes your expenses and identifies spending patterns to help you make better financial decisions.",
      color: "from-purple-400 to-pink-400"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Goal Tracking",
      description: "Set and track multiple financial goals with visual progress indicators and personalized recommendations to reach them faster.",
      color: "from-emerald-400 to-teal-400"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Group Savings",
      description: "Collaborate with family or friends on shared financial goals, split expenses, and track collective progress together.",
      color: "from-blue-400 to-cyan-400"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Achievement System",
      description: "Stay motivated with badges and milestones as you build healthy spending habits and reach your financial targets.",
      color: "from-yellow-400 to-orange-400"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Advanced Analytics",
      description: "Comprehensive insights with interactive charts, spending trends, and forecasting to understand your financial patterns.",
      color: "from-indigo-400 to-purple-400"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "Your financial data is protected with industry-standard encryption and privacy-first design principles.",
      color: "from-green-400 to-emerald-400"
    }
  ];

  const benefits = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Save Time",
      description: "Automatic transaction categorization saves hours of manual entry",
      gradient: "from-pink-100 to-rose-100",
      iconColor: "text-pink-500"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Improve Finances",
      description: "Users typically save 15-20% more after using Budgetly for 3 months",
      gradient: "from-green-100 to-emerald-100",
      iconColor: "text-emerald-500"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Easy to Use",
      description: "Intuitive interface designed for users of all experience levels",
      gradient: "from-blue-100 to-cyan-100",
      iconColor: "text-blue-500"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Access Anywhere",
      description: "Web-based platform works on all devices and browsers",
      gradient: "from-purple-100 to-indigo-100",
      iconColor: "text-purple-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Teacher",
      content: "Budgetly helped me finally understand where my money was going. I've saved over $3,000 this year!",
      rating: 5,
      avatar: "bg-gradient-to-br from-pink-300 to-rose-300"
    },
    {
      name: "David L.",
      role: "Freelancer",
      content: "The group savings feature made planning our family vacation so much easier. Everyone could track contributions.",
      rating: 5,
      avatar: "bg-gradient-to-br from-blue-300 to-cyan-300"
    },
    {
      name: "Maria R.",
      role: "Student",
      content: "As a college student, this app helps me stick to my budget and actually save money for the first time.",
      rating: 5,
      avatar: "bg-gradient-to-br from-green-300 to-emerald-300"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full opacity-40 animate-ping"></div>
        <div className="absolute top-3/4 right-1/6 w-36 h-36 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
      </div>

      {/* Navbar */}
      <header className="relative z-20 w-full flex flex-wrap md:flex-nowrap justify-between items-center px-4 md:px-6 py-4 backdrop-blur-md bg-white/90 border-b border-gray-100 shadow-sm">
  {/* Logo and Title */}
  <div className="flex items-center gap-3 mb-4 md:mb-0">
    <div className="p-2 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl">
      <DollarSign className="w-6 h-6 text-white" />
    </div>
    <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
      Budgetly
    </h1>
  </div>

  {/* Auth Buttons */}
  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full md:w-auto">
    <button
      onClick={() => navigate("/login")}
      className="px-6 py-2.5 text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-medium w-full sm:w-auto"
    >
      Login
    </button>
    <button
      onClick={() => navigate("/register")}
      className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl font-medium w-full sm:w-auto"
    >
      Sign Up Free
    </button>
  </div>
</header>


      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-emerald-200 shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span>100% Free Budget Management</span>
          </div>
          
          <h2 className="text-6xl sm:text-2xl md:text-8xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent">
              Take Control of Your{" "}
            </span>
            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
              Financial Future
            </span>
          </h2>
          
          <p className="text-gray-600 text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            The most beautiful and intelligent budgeting platform that helps you track expenses, 
            achieve goals, and build better financial habits with AI-powered insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button
              onClick={() => navigate("/register")}
              className="group bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 text-white px-10 py-5 rounded-2xl font-semibold hover:from-emerald-600 hover:via-teal-600 hover:to-blue-600 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 flex items-center space-x-3 text-lg"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
            
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500 text-sm">
            <div className="flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-full backdrop-blur-sm border border-gray-100">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span>Always free to use</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-full backdrop-blur-sm border border-gray-100">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span>No credit card needed</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-full backdrop-blur-sm border border-gray-100">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span>Privacy focused</span>
            </div>
          </div>
        </div>
      </main>

      

      {/* Features Section */}
      <section className="relative z-10 py-24 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-5xl font-black text-gray-800 mb-6">
              Everything You Need to Master Your Money
            </h3>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto font-light">
              Powerful features designed to make budgeting simple, effective, and completely free
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-8 bg-white rounded-3xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:scale-105"
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-gray-800 mb-4">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 py-24 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-20">
            <h3 className="text-5xl font-black text-gray-800 mb-6">
              Why Choose Budgetly?
            </h3>
            <p className="text-gray-600 text-xl font-light">
              Join thousands who have transformed their financial habits
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className={`text-center p-8 bg-gradient-to-br ${benefit.gradient} rounded-3xl border border-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105`}
              >
                <div className={`${benefit.iconColor} mb-6 flex justify-center`}>
                  {benefit.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">
                  {benefit.title}
                </h4>
                <p className="text-gray-600 font-light">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-5xl font-black text-gray-800 mb-6">
              Real Stories from Real Users
            </h3>
            <p className="text-gray-600 text-xl font-light">
              See how Budgetly has helped people take control of their finances
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="p-8 bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex space-x-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic text-lg font-light leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full ${testimonial.avatar} flex items-center justify-center text-white font-bold text-lg`}>
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">{testimonial.name}</div>
                    <div className="text-gray-500 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-4 bg-gradient-to-r from-emerald-100 via-teal-100 to-blue-100">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-5xl font-black text-gray-800 mb-6">
            Ready to Start Your Financial Journey?
          </h3>
          <p className="text-gray-600 text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Join thousands of users who have already taken control of their finances with Budgetly's beautiful, free platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => navigate("/register")}
              className="bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 text-white px-12 py-6 rounded-2xl font-bold hover:from-emerald-600 hover:via-teal-600 hover:to-blue-600 transition-all duration-300 shadow-2xl hover:shadow-3xl text-xl hover:scale-105"
            >
              Start Budgeting for Free
            </button>
            <div className="text-gray-500 text-sm font-light bg-white px-6 py-3 rounded-full border border-gray-200">
              No signup fees • Always free • No hidden costs
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="p-2 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Budgetly</span>
            </div>
            <div className="text-gray-500 text-sm font-light">
              Making financial wellness accessible to everyone ✨
            </div>
          </div>
          <div className="text-center text-gray-400 text-sm mt-8 pt-8 border-t border-gray-100">
            © {new Date().getFullYear()} Budgetly. Built with ❤️ for better financial futures.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;