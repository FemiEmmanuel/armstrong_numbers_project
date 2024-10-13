import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import { clearUser } from "../store/slices/userSlice";
import { useGetUserQuery } from "../store/api";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user.currentUser);

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

  return (
    <nav className="flex justify-between items-center bg-white text-[#003366] fixed top-0 left-0 right-0 z-20 p-4 shadow-md">
      {/* Left section */}
      <div className="flex items-center ml-4 md:ml-28">
        <a href="#contact" className="hover:text-[#FF6F61]">
          Contact
        </a>
      </div>

      {/* Center section - Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <h1 className="text-2xl font-bold">Armstrong App</h1>
      </div>

      {/* Right section */}
      <div className="flex items-center mr-4 md:mr-28 gap-4">
        {isAuthenticated && (userData || user) && (
          <>
            {/* Welcome message */}
            <div className="welcome-message hidden md:block">
              Welcome,{" "}
              <span className="font-bold">{(userData || user).username}</span>!
            </div>

            <button
              onClick={handleLogout}
              aria-label="Logout"
              className="flex items-center text-red-500 hover:text-red-600"
            >
              <FaSignOutAlt size={20} />
              <span className="ml-1 hidden md:inline">Logout</span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
