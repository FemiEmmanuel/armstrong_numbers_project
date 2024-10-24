import React from "react";
import {
  Home,
  CheckCircle,
  MessageSquare,
  Mail,
  User,
  List,
} from "lucide-react";

const SidebarLink = ({
  icon: Icon,
  text,
  isActive,
  onClick,
  expanded,
  darkMode,
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center p-2 rounded-lg transition-colors duration-200 ${
      isActive
        ? "text-blue-500 bg-blue-100 dark:bg-blue-900 dark:text-blue-300"
        : `${
            darkMode
              ? "text-gray-300 hover:bg-gray-700"
              : "text-gray-600 hover:bg-gray-100"
          }`
    }`}
  >
    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
      <Icon size={24} />
    </div>
    <span
      className={`ml-3 whitespace-nowrap transition-opacity duration-300 ${
        expanded ? "opacity-100" : "opacity-0"
      }`}
      style={{
        width: expanded ? "auto" : "0",
        overflow: "hidden",
      }}
    >
      {text}
    </span>
  </button>
);

const linkGroups = [
  {
    heading: "Main",
    links: [
      { icon: Home, text: "Home", id: "home" },
      { icon: CheckCircle, text: "Check Armstrong", id: "check-armstrong" },
      { icon: MessageSquare, text: "Feedback", id: "feedback" },
      { icon: Mail, text: "Contact", id: "contact" },
    ],
  },
  {
    heading: "User Settings",
    links: [
      { icon: User, text: "Profile", id: "profile" },
      { icon: List, text: "Attempts", id: "attempts" },
    ],
  },
];

const Sidebar = ({
  expanded,
  activePage,
  setActivePage,
  isMobile,
  darkMode,
}) => {
  return (
    <aside
      className={`h-screen fixed top-0 left-0 z-30 transition-all duration-300 ease-in-out transform border-r p-3 ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } ${
        expanded
          ? "translate-x-0 w-64"
          : isMobile
          ? "-translate-x-full w-64"
          : "translate-x-0 w-16"
      }`}
    >
      <nav className="flex-1 pt-16">
        {linkGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-4">
            {expanded && (
              <h3
                className={`px-4 py-2 text-sm font-semibold transition-opacity duration-300 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                } ${expanded ? "opacity-100" : "opacity-0"}`}
              >
                {group.heading}
              </h3>
            )}
            <ul className="space-y-2">
              {group.links.map((link) => (
                <li key={link.id}>
                  <SidebarLink
                    icon={link.icon}
                    text={link.text}
                    isActive={activePage === link.id}
                    onClick={() => setActivePage(link.id)}
                    expanded={expanded}
                    darkMode={darkMode}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
