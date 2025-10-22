import React from "react";
import { useLocation, useParams } from "react-router-dom";

import { useCartLogic } from "../CustomHooks/useCartLogic";
import { useState, useEffect } from "react";
import OrderCart from "./OrderCart";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firbase";

const CategoryPage = () => {
  const [quantityMap, setQuantityMap] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const { categoryName } = useParams();

  const location = useLocation();

  const tableName = new URLSearchParams(location.search).get("table");

  const { Cart, increaseQuantity, decreaseQuantity } = useCartLogic(tableName);

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
        console.error("Firestore error:", error);
      }
    );

    return () => unsubscribe(); // Cleanup listener
  }, []);

  // Handle increasing quantity
  const handleIncrease = async (item) => {
    await increaseQuantity(item);
    setQuantityMap((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
  };

  // Handle decreasing quantity
  const handleDecrease = async (item) => {
    await decreaseQuantity(item);
    setQuantityMap((prev) => {
      const newQty = (prev[item.id] || 1) - 1;
      if (newQty <= 0) {
        const { [item.id]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [item.id]: newQty,
      };
    });
  };

  if (loading) return <p>Loading...</p>;
  const category = categories.find(
    (cat) => cat.name.toLowerCase() === categoryName?.toLowerCase()
  );

  if (!category) return <p>Category not found</p>;

  return (
    <div className="">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white shadow">
        <div className="flex items-center gap-3">
          <img src="/Coffee.png" alt="/Bistro" className="h-12 w-12" />
          <h1 className="font-semibold pt-2 text-lg">Bistro</h1>
        </div>
      </header>
      <p className="font-medium text-left border-b border-gray-300 pt-3 pb-2 mx-3 text-gray-600 mt-4 mb-4">
        {category.name}
      </p>

      <div className="space-y-4 p-4">
        {(category.items || []).map((item, index) => {
          const cartItem = Cart.find((i) => i.id === item.id);
          const qty = cartItem ? cartItem.qty : 0;

          return (
            <div
              key={item.id || index}
              className="flex items-center justify-between border-b-1 border-dashed border-gray-300  p-2 "
            >
              {/* Left: Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w- 18 h-18 object-cover "
              />

              {/* Center: Item Name */}
              <div className="flex-1 text-left px-4">
                <p className="font-semibold text-base text-gray-800">
                  {item.name}
                </p>
              </div>

              {/* Right: Price & Add to Cart or Quantity Controls (Vertically stacked) */}
              <div className="flex flex-col items-end justify-between h-full space-y-2 min-w-[120px]">
                <p className="text-sm font-medium text-gray-700">
                  ₹ {item.price}.00
                </p>

                {qty === 0 ? (
                  <button
                    onClick={() => handleIncrease(item)}
                    className="bg-white text-orange-500  py-1 px-2 rounded-lg  border-1"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="flex items-center bg-white text-orange-500   px-2 rounded-lg  border-1">
                    <button
                      onClick={() => handleDecrease(item)}
                      className="bg-white font-semibold items-start text-orange-500  py-1 px-3  "
                    >
                      -
                    </button>
                    <span className=" ">{qty}</span>
                    <button
                      onClick={() => handleIncrease(item)}
                      className="bg-white text-orange-500  py-1 px-3 "
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <OrderCart />
    </div>
  );
};

export default CategoryPage;
