import React, { useState, useEffect } from "react";
import { useRegisterMutation } from "../store/api";
import { FormInput, SubmitButton} from "./FormInput";
import ErrorDisplay from "./ErrorDisplay";

const SignupForm = ({ onSwitchTab }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    contact_number: "",
  });
  const [register, { isLoading, error }] = useRegisterMutation();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setShowSuccess(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData).unwrap();
      setShowSuccess(true);
    } catch (err) {}
  };

  const handleLoginClick = () => {
    setShowSuccess(false);
    onSwitchTab();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <FormInput
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <ErrorDisplay error={error} field="username" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <FormInput
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <ErrorDisplay error={error} field="email" />
          </div>
          <div>
            <FormInput
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <ErrorDisplay error={error} field="password" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <FormInput
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
            <ErrorDisplay error={error} field="first_name" />
          </div>
          <div>
            <FormInput
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
            <ErrorDisplay error={error} field="last_name" />
          </div>
        </div>
        <div>
          <FormInput
            type="tel"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleChange}
            placeholder="Contact Number"
            required
          />
          <ErrorDisplay error={error} field="contact_number" />
        </div>
        <SubmitButton
          isLoading={isLoading}
          label={isLoading ? "Signing up" : "Sign up"}
        />
        <ErrorDisplay error={error} />
        <p className="mt-4 text-center text-[#003366]">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchTab}
            className="font-medium text-[#FF6F61] hover:text-red-100"
          >
            Log in here.
          </button>
        </p>
      </form>

      {/* Custom Success Dialog */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSuccess(false)}
          />

          {/* Dialog Content */}
          <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 transform transition-all">
            {/* Close button */}
            <button
              onClick={() => setShowSuccess(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Content */}
            <div className="p-6">
              <div className="text-center mb-6">
                {/* Success Icon */}
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-[#003366] mb-2">
                  Welcome to Armstrong App!
                </h3>
                <p className="text-gray-600">
                  Your account has been successfully created. Please log in to
                  continue.
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={handleLoginClick}
                className="w-full py-3 px-4 bg-[#FF6F61] text-white rounded-lg font-medium hover:bg-[#ff8578] transform transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#FF6F61] focus:ring-offset-2"
              >
                Continue to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignupForm;
