import React, { useState } from "react";
import ManageTables from "./ManageTables";
import ManageMenu from "./ManageMenu.";
import ManageOrders from "./ManageOrders";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firbase";
import { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // or your preferred toast lib

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("tables");

  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const now = new Date(); // Current time on load

    const q = query(collection(db, "orders"), where("status", "==", "pending"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const data = change.doc.data();

          // Skip old orders before page load
          const orderTime = data.timestamp?.toDate?.(); // convert Firestore timestamp to JS Date
          if (orderTime && orderTime < now) return;

          toast.success(`🧾 New order from ${data.table}!`);

          const audio = new Audio("/Sounds/new-order.wav");
          audio.play().catch((e) => console.warn("Sound failed to play", e));
        }
      });
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate("/"); // or wherever your login page is
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };

  const renderCurrentTab = () => {
    switch (activeTab) {
      case "tables":
        return <ManageTables />;
      case "menu":
        return <ManageMenu />;
      case "orders":
        return <ManageOrders />;
      default:
        return <ManageTables />;
    }
  };

  return (
    <div className="flex flex-col h-screen relative">
      <header className="flex sticky items-center justify-between px-4 py-3 bg-white shadow ">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setShowLogout(true)}
        >
          <img src="/logo.png" alt="Cafe Ravli" className="h-8 w-8" />
          <h1 className="font-semibold text-lg">Cafe Ravli</h1>
        </div>
      </header>
      {showLogout && (
        <div className="fixed inset-0 z-[1000] bg-black/30 flex items-center justify-center">
          <div className="bg-white border border-gray-300 rounded shadow-lg p-4  max-w-sm">
            <p className="text-sm mb-2 text-gray-800">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowLogout(false)}
                className="text-sm px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-grow overflow-y-auto">{renderCurrentTab()}</div>
      {/* Bottom Navigation */}
      <nav className="flex justify-around bg-gray-200 border-t p-2 fixed bottom-0 left-0 right-0 z-50">
        <button
          onClick={() => setActiveTab("menu")}
          className={`px-3 py-1 text-sm rounded-md ${
            activeTab === "menu" ? "bg-blue-500 text-white" : "text-gray-700"
          }`}
        >
          Manage Menu
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-3 py-1 text-sm rounded-md ${
            activeTab === "orders" ? "bg-blue-500 text-white" : "text-gray-700"
          }`}
        >
          Manage Orders
        </button>
        <button
          onClick={() => setActiveTab("tables")}
          className={`px-3 py-1 text-sm rounded-md ${
            activeTab === "tables" ? "bg-blue-500 text-white" : "text-gray-700"
          }`}
        >
          Manage Tables
        </button>
      </nav>
    </div>
  );
};

export default AdminPanel;
