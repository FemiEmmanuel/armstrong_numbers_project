import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon, User, LogOut } from "lucide-react";
import { useGetUserQuery, useLogoutMutation } from "../store/api";

const Header = ({ sidebarExpanded, toggleSidebar, darkMode, setDarkMode }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user.currentUser);
  const [logout, {isLoading: logoutLoading, error: logoutError }]  = useLogoutMutation();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { data: userData } = useGetUserQuery(undefined, {
    skip: !isAuthenticated,
  });

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate("/");
    } catch (e) {}
  };

  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);
  const name = (userData || user)?.first_name || "User";
  const email = (userData || user)?.email || "Email";

  return (
    <header
      className={`p-4 flex justify-between items-center shadow-sm fixed top-0 left-0 right-0 z-40 border-b transition-colors duration-300 ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className={`hover:text-gray-700 mr-4 ${
            darkMode
              ? "text-gray-400 hover:text-gray-200"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {sidebarExpanded ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <div
        className={`font-bold text-3xl text-center flex items-center ${
          darkMode ? "text-white" : "text-[#003366]"
        }`}
      >
        Armstrong
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${
            darkMode
              ? "text-gray-400 hover:text-gray-200 dark:hover:bg-gray-700"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
        <div className="relative">
          <button
            onClick={toggleUserMenu}
            className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${
              darkMode
                ? "text-gray-400 hover:text-gray-200 dark:hover:bg-gray-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <User size={24} />
          </button>
          {showUserMenu && (
            <div
              className={`absolute right-0 mt-2 w-auto rounded-lg shadow-lg overflow-hidden border transition-colors ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="p-4">
                <div className="flex items-center">
                  <div
                    className={`p-2 rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    <User
                      size={24}
                      className={darkMode ? "text-gray-300" : "text-gray-600"}
                    />
                  </div>
                  <div className="ml-3">
                    <h3
                      className={`font-semibold ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {name}
                    </h3>
                    <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                      {email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className={`mt-4 w-full py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${
                    darkMode
                      ? "bg-[#FF6F61] text-white hover:bg-[#ff8578]"
                      : "bg-[#003366] text-white hover:bg-[#00509E]"
                  }`}
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
