import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import { clearUser } from "../store/slices/userSlice";
import { useGetUserQuery } from "../store/api";
import ArmstrongCalculator from "../components/ArmstrongCalculator";
import {
  FaHome,
  FaCheck,
  FaCog,
  FaComments,
  FaEnvelope,
  FaSignOutAlt,
} from "react-icons/fa";

// Placeholder components for each section
const Home = () => <div>Home Content</div>;
const Settings = () => <div>Settings Content</div>;
const Feedback = () => <div>Feedback Content</div>;
const Contact = () => <div>Contact Content</div>;

const Homepage = () => {
  const [activeComponent, setActiveComponent] = useState("Home");
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

  const renderComponent = () => {
    switch (activeComponent) {
      case "Home":
        return <Home />;
      case "Check Armstrong":
        return <ArmstrongCalculator />;
      case "Settings":
        return <Settings />;
      case "Feedback":
        return <Feedback />;
      case "Contact":
        return <Contact />;
      default:
        return <Home />;
    }
  };

  const sidebarItems = [
    { name: "Home", icon: <FaHome /> },
    { name: "Check Armstrong", icon: <FaCheck /> },
    { name: "Profile Settings", icon: <FaCog /> },
    { name: "Feedback", icon: <FaComments /> },
    { name: "Contact", icon: <FaEnvelope /> },
  ];

  // Get the first letter of the username for the avatar
  const username = (userData || user)?.username || "User";
  const avatarPlaceholder = username.charAt(0).toUpperCase();

  return (
    <div className="flex h-screen bg-[#F5F5F5] mx-4">
      {/* Sidebar */}
      <div className="flex-shrink-0 w-64 bg-white shadow-lg flex flex-col">
        {/* Logo */}
        <div className="p-4 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-[#003366]">Armstrong App</h2>
          {/* Avatar Section */}
          <div className="flex items-center justify-center mt-4 mb-2">
            <div className="w-16 h-16 rounded-full bg-[#003366] text-white flex items-center justify-center text-2xl font-bold">
              {avatarPlaceholder}
            </div>
          </div>
          {/* Welcome Message */}
          <p className="text-center text-[#003366]">Welcome back,</p>
          <h2 className="text-xl font-semibold text-[#003366]">{username}</h2>
        </div>
        {/* Navigation */}
        <nav className="flex-grow">
          <ul className="flex flex-col p-4">
            {sidebarItems.map((item) => (
              <li key={item.name} className="mb-2">
                <button
                  onClick={() => setActiveComponent(item.name)}
                  className={`w-full flex items-center p-3 rounded-md hover:bg-[#FF6F61] hover:text-white transition duration-200 ease-in-out ${
                    activeComponent === item.name
                      ? "bg-[#003366] text-white"
                      : "text-[#003366] bg-white"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        {/* Sign Out */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center p-3 rounded-md hover:bg-[#FF6F61] hover:text-white mt-auto transition duration-200 ease-in-out"
        >
          <FaSignOutAlt className="mr-3" />
          Sign Out
        </button>
      </div>

      {/* Main content */}
      <div className="flex-grow p-8 overflow-auto">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Homepage;
