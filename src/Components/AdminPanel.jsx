import React, { useState, useEffect } from "react";
import ManageTables from "./ManageTables";
import ManageMenu from "./ManageMenu.";
import ManageOrders from "./ManageOrders";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firbase";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import NavbarOwner from "./NavbarOwner";
import toast from "react-hot-toast";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("tables");
  const navigate = useNavigate();

  useEffect(() => {
    const now = new Date();
    const q = query(collection(db, "orders"), where("status", "==", "pending"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const data = change.doc.data();
          const orderTime = data.timestamp?.toDate?.();
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
      navigate("/");
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
      {/* Pass activeTab and setActiveTab to NavbarOwner */}
      <NavbarOwner
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      <div className="flex-grow ">{renderCurrentTab()}</div>
    </div>
  );
};

export default AdminPanel;
