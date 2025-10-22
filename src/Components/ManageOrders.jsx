import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firbase";
import OrderListCard from "./OrderListCard";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "orders"),
      (snapshot) => {
        const orderList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(orderList);
        setLoading(false); // Stop loading once we get data
      },
      (error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  return (
    <div className="">
      {/* Always visible */}

      <div className="p-4">
        <h2 className="text-lg text-left text-gray-700 font-semibold mb-4">
          Incoming Orders
        </h2>

        {/* Only this part shows conditional content */}
        {loading ? (
          <p className="text-gray-500">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-orange-500">No orders yet...</p>
        ) : (
          orders.map((order) => <OrderListCard key={order.id} order={order} />)
        )}
      </div>
    </div>
  );
};

export default ManageOrders;
