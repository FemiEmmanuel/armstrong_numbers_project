import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon, User, LogOut } from "lucide-react";
import { useGetUserQuery, useLogoutMutation } from "../store/api";

const Header = ({ sidebarExpanded, toggleSidebar, darkMode, setDarkMode }) => {
  const { refreshToken, isAuthenticated } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user.currentUser);
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);

  const { data: userData } = useGetUserQuery(undefined, {
    skip: !isAuthenticated,
  });

  const handleLogout = async () => {
    try {
      const refresh_token = refreshToken;
      await logout(refresh_token).unwrap();
      setShowSignOutDialog(false);
      navigate("/");
    } catch (e) {}
  };

  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);
  const name = (userData || user)?.first_name || "User";
  const email = (userData || user)?.email || "Email";

  return (
    <>
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
          Armstrong App
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
                      <p
                        className={darkMode ? "text-gray-400" : "text-gray-600"}
                      >
                        {email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowSignOutDialog(true);
                      setShowUserMenu(false);
                    }}
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

      {showSignOutDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSignOutDialog(false)}
          />
          <div
            className={`relative rounded-lg shadow-2xl w-full max-w-md mx-4 transform transition-all ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <button
              onClick={() => setShowSignOutDialog(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            <div className="p-6">
              <div className="text-center mb-6">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                  <LogOut className="h-6 w-6 text-blue-600" />
                </div>

                <h3
                  className={`text-2xl font-bold mb-2 ${
                    darkMode ? "text-white" : "text-[#003366]"
                  }`}
                >
                  Sign Out
                </h3>
                <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                  Are you sure you want to sign out of your account?
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowSignOutDialog(false)}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transform transition-all duration-200 ${
                    darkMode
                      ? "bg-gray-700 text-white hover:bg-gray-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  disabled={isLoading}
                  className="flex-1 py-3 px-4 bg-[#003366] text-white rounded-lg font-medium hover:bg-[#00509E] transform transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#003366] focus:ring-offset-2 disabled:opacity-50"
                >
                  {isLoading ? "Signing out..." : "Sign Out"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
