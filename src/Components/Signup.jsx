import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Firebase Auth signup logic here
    console.log("Sign up:", { fullName, email, password });
  };

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-[400px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Create an account
          </h2>
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-blue-600 hover:underline"
          >
            Login
          </button>
        </div>

        <p className="text-sm text-left text-gray-500 mb-6">
          Enter your details to create your account
        </p>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Full Name */}
          <div className="text-left">
            <label className="text-sm text-left font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-base"
            />
          </div>

          {/* Email */}
          <div className="text-left">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-base"
            />
          </div>

          {/* Password */}
          <div className="text-left">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-base"
            />
          </div>

          {/* Confirm Password */}
          <div className="text-left">
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-base"
            />
          </div>

          {/* Sign Up Button */}
          <button
            onClick={handleSignup}
            className="w-full bg-black text-white py-3 rounded-md text-base font-medium hover:bg-gray-900"
          >
            Sign Up
          </button>

          {/* Google Sign Up */}
          <button className="w-full border border-gray-300 py-3 rounded-md text-base font-medium hover:bg-gray-100">
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
