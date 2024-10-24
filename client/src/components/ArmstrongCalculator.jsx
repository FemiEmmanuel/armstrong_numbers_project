import React, { useState } from "react";
import { useCheckArmstrongMutation, useCheckRangeMutation } from "../store/api";
import { FormInput, SubmitButton } from "./FormInput";
import ErrorDisplay from "./ErrorDisplay";
import { RotateCcw } from "lucide-react";

const ArmstrongCalculator = ({ darkMode }) => {
  const [number, setNumber] = useState("");
  const [minRange, setMinRange] = useState("");
  const [maxRange, setMaxRange] = useState("");
  const [resultSingle, setResultSingle] = useState(null);
  const [resultRange, setResultRange] = useState(null);
  const [activeTab, setActiveTab] = useState("single");

  const [checkNumber, { isLoading, error }] = useCheckArmstrongMutation();
  const [checkRange, { isLoading: rangeLoading, error: rangeError }] =
    useCheckRangeMutation();

  const handleSingleCheck = async (e) => {
    e.preventDefault();
    try {
      const res = await checkNumber(number).unwrap();
      setResultSingle(res);
    } catch (error) {}
  };

  const handleRangeCheck = async (e) => {
    e.preventDefault();
    try {
      const range = { min_range: minRange, max_range: maxRange };
      const res = await checkRange(range).unwrap();
      setResultRange(res);
    } catch (error) {}
  };

  const handleSingleReset = () => {
    setNumber("");
    setResultSingle(null);
  };

  const handleRangeReset = () => {
    setMinRange("");
    setMaxRange("");
    setResultRange(null);
  };

  const ResetButton = ({ onClick }) => (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 px-6 py-2 mt-2 text-red-500 transition duration-200 border border-red-500 rounded-lg hover:bg-red-50 w-fit"
    >
      <RotateCcw size={16} />
      Reset
    </button>
  );

  return (
    <>
      <h2
        className={`font-bold mb-4 ${
          darkMode ? "text-white" : "text-[#003366]"
        }`}
      >
        Armstrong Number Calculator
      </h2>
      <div
        className={`max-w-lg p-5 rounded-lg shadow-lg ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <TabButton
            label="Check Single Number"
            isActive={activeTab === "single"}
            onClick={() => setActiveTab("single")}
            darkMode={darkMode}
          />
          <TabButton
            label="Check Range"
            isActive={activeTab === "range"}
            onClick={() => setActiveTab("range")}
            darkMode={darkMode}
          />
        </div>

        {/* Single Number Tab */}
        {activeTab === "single" && (
          <div className="flex flex-col">
            <form onSubmit={handleSingleCheck} className="mb-6">
              <h3
                className={`text-lg font-semibold mb-4 ${
                  darkMode ? "text-white" : "text-[#003366]"
                }`}
              >
                Check a single number
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  type="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="Enter a number"
                  required
                  className={`border rounded-lg p-2 w-full ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "border-gray-300 text-gray-900"
                  }`}
                  darkMode={darkMode}
                />
                  <SubmitButton
                    className={`mt-4 rounded-lg px-6 py-2 transition duration-200 w-fit ${
                      darkMode
                        ? "bg-[#FF6F61] text-white hover:bg-[#ff8578]"
                        : "bg-[#003366] text-white hover:bg-[#00509E]"
                    }`}
                    isLoading={isLoading}
                    label={isLoading ? "Checking" : "Check"}
                  />
              </div>
              <ErrorDisplay error={error} />
            </form>

            {resultSingle && (
              <div
                className={`mt-6 p-4 rounded-lg shadow-md ${
                  darkMode ? "bg-gray-700" : "bg-[#F5F5F5]"
                }`}
              >
                <h3
                  className={`text-xl font-semibold ${
                    darkMode ? "text-white" : "text-[#003366]"
                  }`}
                >
                  Result:
                </h3>
                <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                  {resultSingle.attempted_number} is{" "}
                  <span className="font-bold">
                    {resultSingle.is_armstrong ? "an" : "not an"}
                  </span>{" "}
                  Armstrong number.
                </p>
                <ResetButton onClick={handleSingleReset} />
              </div>
            )}
          </div>
        )}

        {/* Range Tab */}
        {activeTab === "range" && (
          <div className="flex flex-col">
            <form onSubmit={handleRangeCheck} className="mb-6">
              <h3
                className={`text-xl font-semibold mb-4 ${
                  darkMode ? "text-white" : "text-[#003366]"
                }`}
              >
                Check a range of numbers
              </h3>
              <div className="grid grid-cols-2 mb-5 gap-4">

                  <FormInput
                    type="number"
                    value={minRange}
                    onChange={(e) => setMinRange(e.target.value)}
                    placeholder="Min range"
                    required
                    className={`border rounded-lg p-2 w-full ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "border-gray-300 text-gray-900"
                    }`}
                    darkMode={darkMode}
                  />
              
                  <FormInput
                    type="number"
                    value={maxRange}
                    onChange={(e) => setMaxRange(e.target.value)}
                    placeholder="Max range"
                    required
                    className={`border rounded-lg p-2 w-full ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "border-gray-300 text-gray-900"
                    }`}
                    darkMode={darkMode}
                  />
              </div>
              <div className="flex justify-center">
                <SubmitButton
                  className={` rounded-lg px-6 py-2 transition duration-200 w-fit ${
                    darkMode
                      ? "bg-[#FF6F61] text-white hover:bg-[#ff8578]"
                      : "bg-[#003366] text-white hover:bg-[#00509E]"
                  }`}
                  isLoading={rangeLoading}
                  label={rangeLoading ? "Checking Range" : "Check Range"}
                />
              </div>
              <ErrorDisplay error={rangeError} />
            </form>

            {resultRange && (
              <div
                className={`mt-1 p-1 rounded-lg shadow-md`}
              >
                <h3
                  className={`text-sl ${
                    darkMode ? "text-white" : "text-[#003366]"
                  }`}
                >
                  Armstrong numbers from {resultRange.min_range} to{" "}
                  {resultRange.max_range}:
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {resultRange.armstrong_numbers.map((num) => (
                    <span
                      key={num}
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        darkMode
                          ? "bg-[#FF6F61] text-white"
                          : "bg-[#003366] text-white"
                      }`}
                    >
                      {num}
                    </span>
                  ))}
                </div>
                <p
                  className={`mt-2 ${
                    darkMode ? "text-white" : "text-[#003366]"
                  }`}
                >
                  Total count: {resultRange.count}
                </p>
                <ResetButton onClick={handleRangeReset} />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

const TabButton = ({ label, isActive, onClick, darkMode }) => (
  <button
    className={`py-2 px-4 rounded-lg transition duration-200 ${
      isActive
        ? darkMode
          ? "bg-[#FF6F61] text-white font-medium"
          : "bg-[#003366] text-white font-medium"
        : darkMode
        ? "bg-gray-700 text-gray-300"
        : "bg-gray-200 text-gray-600"
    } ${
      darkMode
        ? "hover:bg-[#ff8578] hover:text-white"
        : "hover:bg-[#00509E] hover:text-white"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default ArmstrongCalculator;
