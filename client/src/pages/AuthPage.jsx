import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import WelcomeSection from "../components/WelcomeSection";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("/home");
  //   }
  // }, [isAuthenticated, navigate]);

  const switchTab = () => {
    setActiveTab((prev) => (prev === "login" ? "signup" : "login"));
  };

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <div className="w-1/2 p-8">
        <h1 className="text-3xl font-bold text-[#003366] mb-8">
          Armstrong App
        </h1>
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
          <div className="flex mb-6">
            <TabButton
              label="Login"
              isActive={activeTab === "login"}
              onClick={() => setActiveTab("login")}
            />
            <TabButton
              label="Sign Up"
              isActive={activeTab === "signup"}
              onClick={() => setActiveTab("signup")}
            />
          </div>
          {activeTab === "login" ? (
            <LoginForm onSwitchTab={switchTab} />
          ) : (
            <SignupForm onSwitchTab={switchTab} />
          )}
        </div>
      </div>
      <WelcomeSection />
    </div>
  );
};

const TabButton = ({ label, isActive, onClick }) => (
  <button
    className={`flex-1 py-2 ${
      isActive
        ? "text-[#003366] border-b-2 border-[#003366] font-medium"
        : "text-gray-500"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default AuthPage;
