// ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { auth } from "../firbase";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setChecking(false);
    });
    return () => unsub();
  }, []);

  if (checking) return <p>Checking auth...</p>;

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
