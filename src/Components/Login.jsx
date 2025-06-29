// Login.jsx
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firbase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email && !password) {
      toast.error("Please Enter Email & Password");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/Admin"); // Redirect to Admin Panel
    } catch (err) {
      toast.error("Your email or password is wrong");
      console.error(err);
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-[400px]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Login to your account
          </h2>
        </div>

        <p className="text-sm text-left  text-gray-500 mb-6">
          This login is for test Purpose enter credentials as in placeholder
        </p>

        {/* Form */}
        <div className="space-y-4">
          {/* Email */}
          <div className="text-left">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="test@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-base"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <button className="text-xs text-blue-600 hover:underline">
                Forgot your password?
              </button>
            </div>
            <input
              type="password"
              placeholder="123456"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-base"
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-black text-white py-3 rounded-md text-base font-medium hover:bg-gray-900"
          >
            Login
          </button>

          {/* Google Login */}
          <button className="w-full border border-gray-300 py-3 rounded-md text-base font-medium hover:bg-gray-100">
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
