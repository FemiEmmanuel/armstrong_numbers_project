import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../store/api";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";
import ErrorDisplay from "./ErrorDisplay";

const LoginForm = ({ onSwitchTab }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData).unwrap();
      navigate("/home");
    } catch (err) {
      console.error("Failed to login:", err);
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
      <FormInput
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <SubmitButton isLoading={isLoading} label="Log In" />
      <ErrorDisplay error={error} />
      <p className="mt-4 text-center text-[#003366]">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSwitchTab}
          className="font-medium text-[#FF6F61] hover:text-red-100"
        >
          Sign up here.
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
