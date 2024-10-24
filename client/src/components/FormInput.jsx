import React from "react";

export const FormInput = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  required,
  darkMode = false,
}) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    className={`w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#FF6F61] transition-colors duration-200 ${
      darkMode
        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500"
        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
    } border`}
  />
);

const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 ml-2"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

export const SubmitButton = ({
  isLoading,
  label,
  darkMode = false,
  className = "",
}) => (
  <button
    type="submit"
    disabled={isLoading}
    className={`w-full p-3 rounded font-bold flex items-center justify-center transition-all duration-300 ${
      darkMode
        ? "bg-[#003366] text-white hover:bg-[#FF6F61] disabled:bg-gray-700 disabled:text-gray-400"
        : "bg-[#003366] text-white hover:bg-[#FF6F61] disabled:bg-gray-300 disabled:text-gray-500"
    } ${isLoading ? "cursor-not-allowed opacity-50" : ""} ${className}`}
  >
    {label}
    {isLoading && <Spinner />}
  </button>
);

export default {
  FormInput,
  SubmitButton,
};
