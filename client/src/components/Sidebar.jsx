import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import { clearUser } from "../store/slices/userSlice";
import { useGetUserQuery } from "../store/api";
import { FaHome, FaCheck, FaCog, FaComments, FaEnvelope } from "react-icons/fa";

const Sidebar = ({ activeComponent, setActiveComponent }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: userData, refetch } = useGetUserQuery(undefined, {
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (isAuthenticated && !user) {
      refetch();
    }
  }, [isAuthenticated, user, refetch]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearUser());
    navigate("/");
  };

  const navItems = [
    { name: "Home", icon: FaHome },
    { name: "Check Armstrong", icon: FaCheck },
    { name: "Profile Settings", icon: FaCog },
    { name: "Feedback", icon: FaComments },
    { name: "Contact", icon: FaEnvelope },
  ];

  const name = (userData || user)?.first_name || "User";
  const email = (userData || user)?.email || "Email";
  const avatarPlaceholder = name.charAt(0).toUpperCase();

  return (
    <div className="bg-white w-auto min-h-full flex flex-col shadow-lg rounded-lg overflow-hidden">
      {/* Logo */}
      <div className="p-4">
        <h2 className="text-3xl text-center mb-4 font-bold text-[#003366]">
          Armstrong
        </h2>
        <hr className="my-2 border-gray-300" /> {/* Faint horizontal line */}
      </div>

      {/* Navigation */}
      <nav className="flex-grow p-4">
        {" "}
        {/* Margin top for spacing */}
        <ul>
          {navItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => setActiveComponent(item.name)}
                className={`w-full flex items-center px-2 py-1 mb-2 rounded-3xl hover:bg-[#FF6F61] hover:text-white transition-colors duration-200 ease-in-out ${
                  activeComponent === item.name
                    ? "bg-[#003366] text-white"
                    : "text-gray-600"
                }`}
              >
                <item.icon className="mr-3" />
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-[#003366] text-white flex items-center justify-center text-2xl font-bold mr-3">
            {avatarPlaceholder}
          </div>
          <div>
            <h3 className="font-bold">{name}</h3>
            <p className="text-sm text-gray-500">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
