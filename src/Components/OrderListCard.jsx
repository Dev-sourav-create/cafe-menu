import React from "react";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firbase"; // Adjust the import path if necessary
import toast from "react-hot-toast";

const OrderListCard = ({ order }) => {
  console.log(order);

  const handleCompleteOrder = async () => {
    try {
      const completedRef = doc(db, "completedOrders", order.id);
      await setDoc(completedRef, {
        ...order,
        status: "completed",
        completedAt: new Date().toISOString(),
      });

      await deleteDoc(doc(db, "orders", order.id));
      toast.success(`Order #${order.id} marked as completed`);
    } catch (error) {
      console.error("Error completing order:", error);
      toast.error("Failed to complete order. Try again.");
    }
  };

  return (
    <div className="border-b border-gray-300 px-2 py-4  mb-1">
      {/* Top: ID left, Status right */}
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-gray-500 font-semibold text-sm">
          Order ID - #{order.id}
        </h3>
        <p className="text-xs text-orange-500 font-medium">
          Status: {order.status}
        </p>
      </div>

      {/* Items left, button right */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          {order.items.map((item, idx) => (
            <span key={idx}>
              {item.name} × {item.qty}
              <span className="font-semibold px-3">from {order.table}</span>
              {idx < order.items.length - 1 && " | "}
            </span>
          ))}
        </div>

        <button
          onClick={handleCompleteOrder}
          className="text-xs font-medium px-3 py-1 border border-orange-500 text-orange-500 rounded hover:bg-orange-500 hover:text-white transition"
        >
          Complete
        </button>
      </div>
    </div>
  );
};

export default OrderListCard;
