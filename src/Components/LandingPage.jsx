import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-6 pt-16 pb-10">
        <img
          src="/logo.png"
          alt="Cafe Ravli"
          className="w-20 h-20 mb-4 rounded-full shadow-md"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Cafe Ravli</h1>
        <p className="text-gray-500 text-sm">
          Delicious food, Fast orders, No hassle 🍽️
        </p>
      </div>

      {/* Features Section */}
      <div className="px-6 mb-10 text-left flex justify-center">
        <ul className="space-y-3 text-sm text-gray-700">
          <li>✅ Start your Cafe with this Menu System</li>
          <li>✅ Scan QR & view live menu</li>
          <li>✅ Order directly from your phone</li>
          <li>✅ No app install required</li>
        </ul>
      </div>

      {/* CTA Buttons */}
      <div className="px-6 space-y-4">
        <button
          onClick={() => navigate("/login")}
          className="w-full bg-black text-white py-3 rounded-lg text-sm font-semibold shadow-md hover:bg-gray-900"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="w-full border border-black text-black py-3 rounded-lg text-sm font-semibold hover:bg-gray-100"
        >
          Sign Up
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-24 text-center text-xs text-gray-400 py-6">
        &copy; {new Date().getFullYear()} Cafe Ravli. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
