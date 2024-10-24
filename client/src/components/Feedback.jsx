import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSubmitFeedbackMutation } from "../store/api";
import { addFeedback } from "../store/slices/feedbackSlice";

const Feedback = ({ darkMode }) => {
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const [submitFeedback, { isLoading }] = useSubmitFeedbackMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await submitFeedback({ content }).unwrap();
      dispatch(addFeedback(result));
      setContent("");
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    }
  };

  return (
    <>
      <h2
        className={`font-bold mb-4 ${
          darkMode ? "text-white" : "text-[#003366]"
        }`}
      >
        Feedback
      </h2>
      <div
        className={`max-w-md p-6 shadow-xl ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2
          className={`text-2xl font-bold mb-4 ${
            darkMode ? "text-white" : "text-[#003366]"
          }`}
        >
          Submit Feedback
        </h2>
        {submitted ? (
          <p className="text-green-500 font-semibold">
            Thank you for your feedback!
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="feedback"
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-200" : "text-[#003366]"
                }`}
              >
                Your Feedback:
              </label>
              <textarea
                id="feedback"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border focus:outline-none ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white focus:border-[#FF6F61]"
                    : "bg-white border-gray-300 text-gray-700 focus:border-[#003366]"
                }`}
                rows="4"
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full px-4 py-2 rounded-lg transition duration-300 ${
                darkMode
                  ? "bg-[#FF6F61] text-white hover:bg-[#ff8578]"
                  : "bg-[#003366] text-white hover:bg-[#00509E]"
              } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                darkMode ? "focus:ring-[#FF6F61]" : "focus:ring-[#003366]"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Feedback"}
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default Feedback;
