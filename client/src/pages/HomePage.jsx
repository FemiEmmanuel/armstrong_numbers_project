import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar"
import Header from "../components/Header";
import Content from "../components/Content";

const HomePage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarExpanded, setSidebarExpanded] = useState(!isMobile);
  const [darkMode, setDarkMode] = useState(false);
  const [activePage, setActivePage] = useState("home");
  

  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      setIsMobile(newIsMobile);
      setSidebarExpanded(!newIsMobile);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""}`}>
      <div
        className={`flex flex-col w-full transition-colors duration-300 ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
        }`}
      >
        <Header
          sidebarExpanded={sidebarExpanded}
          toggleSidebar={toggleSidebar}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        <div className="flex flex-1 pt-16">
          <Sidebar
            expanded={sidebarExpanded}
            activePage={activePage}
            setActivePage={setActivePage}
            isMobile={isMobile}
            darkMode={darkMode}
          />
          <Content
            activePage={activePage}
            sidebarExpanded={sidebarExpanded}
            isMobile={isMobile}
            darkMode={darkMode}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
