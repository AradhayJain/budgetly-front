import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const RequireOnboarding = ({ children }) => {
  const { user, token ,loading} = useContext(UserContext);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="text-center">
          <div className="animate-spin inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">
            Loading your dashboard...
          </h2>
          <p className="text-gray-500">
            Please wait while we prepare your personalized insights.
          </p>
        </div>
      </div>
    );
  }


  // Not logged in? Redirect to login
  if (!token) return <Navigate to="/login" />;

  // Already onboarded? Redirect to dashboard
  if (user?.onboardingCompleted) return <Navigate to="/dashboard" />;

  // Else, allow access to onboarding
  return children;
};

export default RequireOnboarding;
