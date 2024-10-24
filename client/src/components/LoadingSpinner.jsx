import React from "react";

const LoadingSpinner = ({ darkMode }) => {
  return (
    <div className="flex justify-center items-center w-full h-40">
      <div className="relative w-12 h-12">
        <div
          className={`absolute w-full h-full rounded-full border-4 border-t-transparent animate-spin ${
            darkMode ? "border-blue-500" : "border-blue-600"
          }`}
        />
        <div
          className={`absolute w-full h-full rounded-full border-4 border-t-transparent animate-ping opacity-20 ${
            darkMode ? "border-blue-500" : "border-blue-600"
          }`}
        />
      </div>
      <span
        className={`ml-3 text-sm font-medium ${
          darkMode ? "text-gray-200" : "text-gray-700"
        }`}
      >
        Loading...
      </span>
    </div>
  );
};

export default LoadingSpinner;
