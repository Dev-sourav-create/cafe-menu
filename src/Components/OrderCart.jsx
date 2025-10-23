import React, { useState } from "react";
import { useCartLogic } from "../CustomHooks/useCartLogic";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import {
  serverTimestamp,
  addDoc,
  collection,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firbase";

const OrderCart = () => {
  const location = useLocation();
  const tableName = new URLSearchParams(location.search).get("table");
  console.log(tableName);

  const { Cart } = useCartLogic(tableName);

  const [showModal, setShowModal] = useState(false);

  const handlePlaceOrder = async () => {
    try {
      await addDoc(collection(db, "orders"), {
        table: tableName,
        items: Cart.map((items) => ({
          name: items.name,
          price: items.price,
          qty: items.qty,
        })),
        status: "pending",
        totalPrice: totalPrice,
        timestamp: serverTimestamp(),
      });

      // 2. Clear cart from Firestore
      const cartRef = doc(db, "cart", tableName);
      await setDoc(cartRef, { cart: [] });

      setShowModal(false);
      const audio = new Audio("/Sounds/order-placed.wav");
      audio.play();
      toast.success("Order placed successfully! 🚀");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const totalItems = Cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = Cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  if (Cart.length === 0 || totalItems === 0) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-yellow-400 flex justify-between items-center px-4 py-3 shadow-inner z-50">
        <p className="text-sm font-semibold">
          ₹ {totalPrice}
          <br />
          <span className="text-xs">Extra charges may apply</span>
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-black text-white px-4 py-2 rounded-md text-sm"
        >
          {totalItems} Items in Cart - View Order
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-end sm:items-center pointer-events-none">
          {/* Modal Container */}
          <div className="bg-white rounded-t-2xl sm:rounded-xl w-full sm:w-[90%] max-w-md p-5 shadow-lg pointer-events-auto">
            <h2 className="text-lg font-semibold mb-4">Your Order Summary</h2>

            <ul className="divide-y max-h-[300px] overflow-y-auto">
              {Cart.map((item, index) => (
                <li key={index} className="py-2 flex justify-between text-sm">
                  <span>
                    {item.name} × {item.qty}
                  </span>
                  <span>₹ {item.qty * item.price}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t pt-2 flex justify-between font-semibold text-sm">
              <span>Total</span>
              <span>₹ {totalPrice}</span>
            </div>

            <input
              type="text"
              placeholder="Enter a note for the entire order"
              className="w-full mt-4 p-2 text-sm border rounded-md"
            />

            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-md text-sm hover:bg-gray-300"
              >
                Close
              </button>
              <button
                onClick={handlePlaceOrder}
                className="px-4 py-2 bg-orange-600 text-white rounded-md text-sm hover:bg-orange-700"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderCart;
