import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OrderCart from "./OrderCart";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../firbase";

const Order = () => {
  const [vegOnly, setVegOnly] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const tableName = new URLSearchParams(location.search).get("table");

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "foodcategories"),
      (snapshot) => {
        const cats = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(cats);
        setLoading(false);
      },
      (error) => {
        console.error("Failed to fetch categories:", error);
      }
    );

    return () => unsubscribe(); // cleanup on unmount
  }, []);

  return (
    <div className="relative min-h-screen pb-20">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white shadow">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Cafe Ravli" className="h-8 w-8" />
          <h1 className="font-semibold text-lg">Cafe Ravli</h1>
        </div>
      </header>

      {/* Toggle Buttons */}
      <div className="flex justify-center gap-6 py-4">
        <button
          onClick={() => setVegOnly(true)}
          className={`px-4 py-1 rounded-full border ${
            vegOnly ? "bg-green-600 text-white" : "bg-gray-100"
          }`}
        >
          Veg
        </button>
        <button
          onClick={() => setVegOnly(false)}
          className={`px-4 py-1 rounded-full border ${
            !vegOnly ? "bg-red-600 text-white" : "bg-gray-100"
          }`}
        >
          Non Veg
        </button>
      </div>

      {/* Categories */}
      <div className="px-4">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-3 gap-4">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() =>
                navigate(`/Order/Categories/${cat.name}?table=${tableName}`)
              }
              className="flex flex-col items-center p-2 border border-gray-300 rounded-lg shadow-sm  transition"
            >
              <img src={cat.img} alt={cat.name} className="w-16 h-16 mb-2" />
              <p className="text-center text-xs font-semibold ">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>
      <OrderCart />
    </div>
  );
};

export default Order;
