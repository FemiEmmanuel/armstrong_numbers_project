import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useCheckArmstrongMutation, useCheckRangeMutation } from "../store/api";
import { addAttempt } from "../store/slices/attemptSlice";

function ArmstrongCalculator() {
  const [number, setNumber] = useState("");
  const [minRange, setMinRange] = useState("");
  const [maxRange, setMaxRange] = useState("");
  const [resultSingle, setResultSingle] = useState(null);
  const [resultRange, setResultRange] = useState(null);
  const [activeTab, setActiveTab] = useState("single"); // State to manage active tab
  const dispatch = useDispatch();

  const [checkNumber] = useCheckArmstrongMutation();
  const [checkRange] = useCheckRangeMutation();

  const handleSingleCheck = async (e) => {
    e.preventDefault();
    try {
      const res = await checkNumber(number).unwrap();
      setResultSingle(res);
      dispatch(addAttempt({ number, is_armstrong: res.is_armstrong }));
    } catch (error) {
      console.error("Error checking number:", error);
    }
  };

  const handleRangeCheck = async (e) => {
    e.preventDefault();
    try {
      const res = await checkRange({
        min_range: minRange,
        max_range: maxRange,
      }).unwrap();
      setResultRange(res);
    } catch (error) {
      console.error("Error checking range:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl text-center font-bold mb-10 text-[#003366]">
        Armstrong Number Calculator
      </h2>

      {/* Tabs */}
      <div className="flex justify-center mb-10">
        <TabButton
          label="Check Single Number"
          isActive={activeTab === "single"}
          onClick={() => setActiveTab("single")}
        />
        <TabButton
          label="Check Range"
          isActive={activeTab === "range"}
          onClick={() => setActiveTab("range")}
        />
      </div>

      {/* Single Number Tab */}
      {activeTab === "single" && (
        <div className="flex flex-col items-center">
          <form onSubmit={handleSingleCheck} className="mb-6 text-center">
            <h3 className="text-xl font-semibold mb-2">
              Check a single number
            </h3>
            <input
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="border rounded p-2 mb-2 w-full max-w-xs"
              placeholder="Enter a number"
              required
            />
            <button
              type="submit"
              className="bg-[#003366] text-white px-4 py-2 rounded hover:bg-[#FF6F61]"
            >
              Check
            </button>
          </form>

          {resultSingle && (
            <div className="mt-6 text-center">
              <h3 className="text-xl font-semibold mb-2 text-[#003366]">
                Result:
              </h3>
              <p>
                {number} is {resultSingle.is_armstrong ? "an" : "not an"}{" "}
                Armstrong number.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Range Tab */}
      {activeTab === "range" && (
        <div className="flex flex-col items-center">
          <form onSubmit={handleRangeCheck} className="text-center">
            <h3 className="text-xl font-semibold mb-2">
              Check a range of numbers
            </h3>
            <input
              type="number"
              value={minRange}
              onChange={(e) => setMinRange(e.target.value)}
              className="border rounded p-2 mb-2 w-full max-w-xs"
              placeholder="Min range"
              required
            />
            <input
              type="number"
              value={maxRange}
              onChange={(e) => setMaxRange(e.target.value)}
              className="border rounded p-2 mb-2 w-full max-w-xs"
              placeholder="Max range"
              required
            />
            <button
              type="submit"
              className="bg-[#003366] text-white px-4 py-2 rounded hover:bg-[#FF6F61]"
            >
              Check Range
            </button>
          </form>

          {resultRange && (
            <div className="mt-6 text-center">
              <h3 className="text-xl font-semibold mb-2 text-[#003366]">
                Results:
              </h3>
              <p>
                Armstrong numbers in the range {minRange} to {maxRange}:
              </p>
              <ul className="list-disc list-inside">
                {resultRange.armstrong_numbers.map((num) => (
                  <li key={num}>{num}</li>
                ))}
              </ul>
              <p>Total count: {resultRange.count}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const TabButton = ({ label, isActive, onClick }) => (
  <button
    className={`flex-1 py-2 ${
      isActive
        ? "text-[#003366] border-b-2 border-[#003366] font-medium"
        : "text-gray-500"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default ArmstrongCalculator;
