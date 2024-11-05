import React, { useState, useEffect } from "react";
import { useRegisterMutation } from "../store/api";
import { FormInput, SubmitButton } from "./FormInput";
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

  const [formErrors, setFormErrors] = useState({});
  const [register, { isLoading, error }] = useRegisterMutation();
  const [showSuccess, setShowSuccess] = useState(false);


  const formatFieldName = (fieldName) => {
    return fieldName
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const validateForm = () => {
    const errors = {};

    // Username validation
    if (formData.username.length < 3) {
      errors.username = "Username must be at least 3 characters long";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Password validation
    const passwordErrors = [];
    if (formData.password.length < 8) {
      passwordErrors.push("be at least 8 characters long");
    }
    if (!/(?=.*[A-Za-z])(?=.*\d)/.test(formData.password)) {
      passwordErrors.push("contain both letters and numbers");
    }

    // Check if password resembles other fields
    const similarityCheck = (field, value) => {
      const passwordLower = formData.password.toLowerCase();
      const valueLower = value.toLowerCase();
      return (
        passwordLower.includes(valueLower) || valueLower.includes(passwordLower)
      );
    };

    const similarFields = Object.entries(formData)
      .filter(
        ([field, value]) =>
          field !== "password" &&
          value.length > 3 &&
          similarityCheck(field, value)
      )
      .map(([field]) => formatFieldName(field));

    if (similarFields.length > 0) {
      passwordErrors.push(
        `not contain parts of your ${similarFields.join(" or ")}`
      );
    }

    if (passwordErrors.length > 0) {
      errors.password = `Password must ${passwordErrors.join(", ")}`;
    }

    // Contact number validation
    if (formData.contact_number.length < 9) {
      errors.contact_number = "Contact number must be at least 9 digits";
    }
    if (!/^\d+$/.test(formData.contact_number)) {
      errors.contact_number = "Contact number must contain only digits";
    }

    // First name and last name validation
    if (formData.first_name.length < 2) {
      errors.first_name = "First name is too short";
    }
    if (formData.last_name.length < 2) {
      errors.last_name = "Last name is too short";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for the field being edited
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await register(formData).unwrap();
      setShowSuccess(true);
    } catch (err) {}
  };

  const handleLoginClick = () => {
    setShowSuccess(false);
    onSwitchTab();
  };

  // Helper function to show appropriate error message
  const getFieldError = (fieldName) => {
    return formErrors[fieldName] || error?.data?.errors?.[fieldName]?.[0];
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
          <ErrorDisplay
            error={{
              data: { errors: { username: [getFieldError("username")] } },
            }}
            field="username"
          />
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
            <ErrorDisplay
              error={{ data: { errors: { email: [getFieldError("email")] } } }}
              field="email"
            />
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
            <ErrorDisplay
              error={{
                data: { errors: { password: [getFieldError("password")] } },
              }}
              field="password"
            />
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
            <ErrorDisplay
              error={{
                data: { errors: { first_name: [getFieldError("first_name")] } },
              }}
              field="first_name"
            />
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
            <ErrorDisplay
              error={{
                data: { errors: { last_name: [getFieldError("last_name")] } },
              }}
              field="last_name"
            />
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
          <ErrorDisplay
            error={{
              data: {
                errors: { contact_number: [getFieldError("contact_number")] },
              },
            }}
            field="contact_number"
          />
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


      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSuccess(false)}
          />
          <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 transform transition-all">
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
            <div className="p-6">
              <div className="text-center mb-6">
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
