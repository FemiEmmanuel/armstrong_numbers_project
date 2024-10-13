import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../store/api";
import { setCredentials } from "../store/slices/authSlice";
import { setUser } from "../store/slices/userSlice";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [notification, setNotification] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await register(formData).unwrap();
      dispatch(setCredentials({ token: result.token }));
      dispatch(setUser(result.user));

      setNotification("Signup successful! Please log in.");

      setTimeout(() => {
        onSwitchTab();
      }, 2000);
    } catch (err) {
      console.error("Failed to signup:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInput
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <FormInput
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
      </div>
      <FormInput
        type="tel"
        name="contact_number"
        value={formData.contact_number}
        onChange={handleChange}
        placeholder="Contact Number"
        required
      />
      <SubmitButton isLoading={isLoading} label="Sign Up" />

      <ErrorDisplay error={error} />

      {notification && (
        <p className="text-green-500 mt-2 text-center font-bold">
          {notification}
        </p>
      )}

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
  );
};

export default SignupForm;
