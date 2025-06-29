import React from "react";
import { useEffect, useState } from "react";
import {
  getDoc,
  setDoc,
  doc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { db } from "../firbase";

export const useCartLogic = (tableName) => {
  const [Cart, setCart] = useState([]);

  // State to indicate if the cart data is currently being loaded
  const [isCartLoading, setIsCartLoading] = useState(true);

  useEffect(() => {
    if (!db || !tableName) {
      setIsCartLoading(false); // If not ready, stop loading state
      return;
    }
    // Reference to the specific cart document in the 'orders' collection
    const cartRef = doc(db, "cart", tableName);
    const unsubscribe = onSnapshot(
      cartRef,
      (cartSnap) => {
        if (cartSnap.exists()) {
          // If the cart document exists, get the 'cart' array from its data
          const orderData = cartSnap.data().cart || [];
          setCart(orderData); // Update the local Cart state
          console.log("Cart updated from Firestore:", orderData);
        } else {
          // If the cart document does not exist, initialize local cart as empty
          setCart([]);
          console.log("Cart document does not exist for table:", tableName);
        }
        setIsCartLoading(false); // Loading is complete once data is fetched
      },
      (error) => {
        // Log any errors that occur during the snapshot listener setup or execution
        console.error("Error listening to cart changes:", error);
        setIsCartLoading(false); // Stop loading on error
      }
    );
    return () => unsubscribe();
  }, [db, tableName]);

  // Function to increase item quantity or add a new item to the cart
  const increaseQuantity = async (item) => {
    if (!db || !tableName) {
      console.error("Firestore DB, TableName, or AppId not initialized.");
      return;
    }
    const cartRef = doc(db, "cart", tableName);

    try {
      // Get the current state of the cart document
      const cartSnap = await getDoc(cartRef);
      let cart = [];

      if (cartSnap.exists()) {
        // If cart exists, get its current cart array
        cart = cartSnap.data().cart || [];
      }

      // Check if the item already exists in the cart
      const existingIndex = cart.findIndex((i) => i.id == item.id);
      if (existingIndex !== -1) {
        // If item exists, increment its quantity
        cart[existingIndex].qty += 1;
      } else {
        // If item is new, add it to the cart with quantity 1
        cart.push({ id: item.id, name: item.name, price: item.price, qty: 1 });
      }

      // Update the Firestore document. setDoc will create the document if it doesn't exist,
      // or overwrite it if it does. This is suitable for updating the entire 'cart' array.
      console.log({ cart });

      await setDoc(cartRef, { cart });
      console.log(`Increased quantity for , ${item.name}`);
    } catch (err) {
      console.log("Error increasing item quantity:", err);
    }
  };
  const decreaseQuantity = async (item) => {
    if (!db || !tableName) {
      console.log("Firestore DB, TableName, or AppId not initialized.");
      return;
    }

    const cartRef = doc(db, "cart", tableName);
    try {
      const cartSnap = await getDoc(cartRef);
      let cart = [];

      if (cartSnap.exists()) {
        cart = cartSnap.data().cart || [];
      } else {
        return;
      }

      const existingIndex = cart.findIndex((i) => i.id == item.id);

      if (existingIndex !== -1) {
        if (cart[existingIndex].qty > 1) {
          cart[existingIndex].qty -= 1;
        } else {
          cart = cart.filter((i) => i.id !== item.id);
        }
      }
      // Update the Firestore document with the modified cart array
      await setDoc(cartRef, { cart });
      console.log(`Decreased quantity for ${item.name}.`);
      // The local 'Cart' state will be updated automatically by the onSnapshot listener
    } catch (error) {
      console.log("error is", error);
    }
  };

  // Empty cart for new customer

  const clearCart = async () => {
    if (!tableName) {
      console.error("No table name provided to clearCart");
      return;
    }

    const cartRef = doc(db, "cart", tableName);
    try {
      await setDoc(cartRef, { cart: [] }, { merge: true });
      console.log("Cart cleared!");
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  return { Cart, increaseQuantity, decreaseQuantity, isCartLoading, clearCart };
};
