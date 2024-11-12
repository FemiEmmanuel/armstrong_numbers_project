import React from "react";
import { useGetContactInfoQuery } from "../store/api";
import Feedback from "./Feedback.jsx";
import ArmstrongCalculator from "./ArmstrongCalculator.jsx";
import Contact from "./Contact.jsx";
import Profile from "./Profile.jsx";
import Attempts from "./Attempts.jsx";
import Home from "./Home.jsx";

const Content = ({ activePage, sidebarExpanded, isMobile, darkMode }) => {
  const {
    data: contactInfo,
    isLoading: contactLoading,
    error: contactError,
  } = useGetContactInfoQuery();

  const renderContent = () => {
    switch (activePage) {
      case "home":
        return <Home darkMode={darkMode} />;
      case "check-armstrong":
        return <ArmstrongCalculator darkMode={darkMode} />;
      case "feedback":
        return <Feedback darkMode={darkMode} />;
      case "contact":
        return <Contact darkMode={darkMode} />;
      case "profile":
        return <Profile darkMode={darkMode} />;
      case "attempts":
        return <Attempts darkMode={darkMode}/>;
      default:
        return <Home darkMode={darkMode} />;
    }
  };

  if (contactLoading) {
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );
  }

  return (
    <main
      className={`flex-1 p-6 transition-all duration-300 ease-in-out ${
        !isMobile ? (sidebarExpanded ? "ml-64" : "ml-16") : "ml-16"
      } ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
    >
      {renderContent()}
    </main>
  );
};

export default React.memo(Content);
