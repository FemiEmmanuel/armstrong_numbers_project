import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TaskList from "./TaskList";
import ArmstrongCalculator from "./ArmstrongCalculator";
import Contact from "./Contact";
// import Dashboard from "./Dashboard"; // Placeholder component
// import Projects from "./Projects"; // Placeholder component
// import Services from "./Services"; // Placeholder component
// import Notifications from "./Notifications"; // Placeholder component
// import Chat from "./Chat"; // Placeholder component

const HomePage = () => {
  const [activeComponent, setActiveComponent] = useState("Task list");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Home":
        return <Home />;
      case "Check Armstrong":
        return <ArmstrongCalculator />;
      case "Profile Setting":
        return <TaskList />;
      case "Feedback":
        return <Services />;
      case "Contact":
        return <Contact />;
      case "Chat":
        return <Chat />;
      default:
        return null; // Or you can return a default component if needed
    }
  };

  return (
    <div className="flex bg-gray-100 p-6 min-h-screen">
      {/* Sidebar Component */}
      <Sidebar
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
      />

      {/* Main Content Area */}
      <div className="flex-grow p-6">
        {/* Render the active component */}
        {renderComponent()}
      </div>
    </div>
  );
};

export default HomePage;
