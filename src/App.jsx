import "./App.css";
import AdminPanel from "./Components/AdminPanel";
import Home from "./Components/Home";
import { Route, Routes } from "react-router-dom";
import Order from "./Components/Order";
import CategoryPage from "./Components/CategoryPage";
import { Toaster } from "react-hot-toast";
import Login from "./Components/Login";
import ProtectedRoute from "./Routes/ProtectedRoute";
import LandingPage from "./Components/LandingPage";
import Signup from "./Components/Signup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/order" element={<Home />} />
        <Route path="/order/Categories" element={<Order />} />
        <Route
          path="/Admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/Categories/:categoryName"
          element={<CategoryPage />}
        />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
