import React, { useState, useEffect } from "react";
import { db } from "../firbase";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const ManageMenu = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategoryItems, setSelectedCategoryItems] = useState([]);
  const [showItemModal, setShowItemModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const [categoryImageUrl, setCategoryImageUrl] = useState("");

  const [itemForm, setItemForm] = useState({
    id: uuidv4(),
    name: "",
    price: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const snap = await getDocs(collection(db, "foodcategories"));
      const cats = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCategories(cats);
      if (cats.length > 0) {
        setSelectedCategoryId(cats[0].id);
        setSelectedCategoryItems(cats[0].items || []);
      }
    };
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    const docRef = await addDoc(collection(db, "foodcategories"), {
      name: newCategory,
      items: [],
      img: categoryImageUrl,
    });
    setCategories([
      ...categories,
      { id: docRef.id, name: newCategory, items: [] },
    ]);
    setNewCategory("");
    setShowAddCategoryModal(false);
  };

  // delete a category
  const handleDeleteCategory = async (categoryId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "foodcategories", categoryId));
      setCategories(categories.filter((cat) => cat.id !== categoryId));

      // If the deleted category was selected, reset selection
      if (selectedCategoryId === categoryId) {
        if (categories.length > 1) {
          const remaining = categories.filter((cat) => cat.id !== categoryId);
          setSelectedCategoryId(remaining[0].id);
          setSelectedCategoryItems(remaining[0].items || []);
        } else {
          setSelectedCategoryId(null);
          setSelectedCategoryItems([]);
        }
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleCategoryClick = (id) => {
    const cat = categories.find((c) => c.id === id);
    setSelectedCategoryId(id);
    setSelectedCategoryItems(cat.items || []);
  };

  const handleSubmitItem = async (e) => {
    e.preventDefault();
    const newItem = {
      ...itemForm,
      price: parseFloat(itemForm.price),
    };
    const updatedItems = [...selectedCategoryItems, newItem];
    const ref = doc(db, "foodcategories", selectedCategoryId);
    await updateDoc(ref, { items: updatedItems });

    setSelectedCategoryItems(updatedItems);
    setCategories((prev) =>
      prev.map((c) =>
        c.id === selectedCategoryId ? { ...c, items: updatedItems } : c
      )
    );
    setShowItemModal(false);
    setItemForm({ name: "", price: "", image: "", description: "" });
  };

  const handleDeleteItem = async (index) => {
    const updatedItems = selectedCategoryItems.filter((_, i) => i !== index);
    const ref = doc(db, "foodcategories", selectedCategoryId);
    await updateDoc(ref, { items: updatedItems });

    setSelectedCategoryItems(updatedItems);
    setCategories((prev) =>
      prev.map((c) =>
        c.id === selectedCategoryId ? { ...c, items: updatedItems } : c
      )
    );
  };

  // Upload image to cloud
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    ); // replace with your preset

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, // replace
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    return data.secure_url;
  };

  return (
    <div className="relative">
      {/* Top: Add category input */}

      {/* Horizontal scroll category list */}
      <div className="overflow-x-auto overflow-y-hidden whitespace-nowrap no-scrollbar py-2">
        <div className="flex space-x-6 items-center py-8 mx-2">
          {categories.map((cat) => {
            const isselected = selectedCategoryId === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`relative inline-flex flex-col items-center min-w-[85px] m-1.5 p-1 rounded-lg transition
  ${
    isselected
      ? "border-orange-300 border-2 shadow-md"
      : "border-gray-300 border"
  }  `}
              >
                {/* 🖼️ Category Image */}
                <img
                  src={cat.img || "https://via.placeholder.com/48"}
                  alt={cat.name}
                  className={`w-18 h-14 mb-1 object-right-top   `}
                />

                {/* 🏷️ Category Name */}
                <p className="text-center text-xs font-semibold">{cat.name}</p>

                {/* ❌ Delete Button only for selected */}
                {selectedCategoryId === cat.id && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent category selection
                      handleDeleteCategory(cat.id);
                    }}
                    className="absolute top-0 left-10/12 -mt-1 -mr-1 bg-white text-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs border shadow"
                  >
                    ✕
                  </button>
                )}
              </div>
            );
          })}

          {/* Add Category Button Card */}
          <div
            onClick={() => setShowAddCategoryModal(true)}
            className="inline-flex flex-col items-center w-18 h-20 justify-center min-w-[85px] p-2 border border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-orange-400 transition"
          >
            <span className="text-3xl text-orange-500">+</span>
            <p className="text-xs text-gray-500"> Add</p>
          </div>
        </div>
      </div>

      {selectedCategoryId && (
        <div className=" flex justify-end px-2">
          <button
            onClick={() => setShowItemModal(true)}
            className="border-1  border-orange-500 text-orange-500 px-3 py-2 rounded-lg"
          >
            + Add Item
          </button>
        </div>
      )}

      {showAddCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm space-y-4">
            <h2 className="text-lg font-semibold text-center">
              Add New Category
            </h2>

            <input
              type="text"
              placeholder="Category name"
              className="w-full border px-3 py-2 rounded"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />

            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (file) {
                  const url = await uploadToCloudinary(file); // You should define this
                  setCategoryImageUrl(url);
                }
              }}
            />

            <div className="flex justify-end gap-2 mt-2">
              <button
                className="text-gray-600"
                onClick={() => setShowAddCategoryModal(false)}
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="bg-orange-500 text-white px-4 py-1 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Items List */}
      <div className="flex justify-start lg:justify-center w-full my-6 px-4 pt-4">
        <div className="space-y-6 w-full max-w-sm sm:max-w-md lg:max-w-2xl overflow-hidden">
          {selectedCategoryItems.map((item, index) => {
            const isLong = item.description?.length > 60;
            const isExpanded = expandedIndex === index;
            const shortDesc = item.description?.slice(0, 60) + "...";

            return (
              <div
                key={index}
                className="flex gap-3 border-b border-dashed border-gray-400 pb-3"
              >
                {/* Left: Image */}
                <img
                  src={item.image || "https://via.placeholder.com/80"}
                  alt={item.name}
                  className="w-16 h-16 rounded object-cover flex-shrink-0"
                />

                {/* Right: Info */}
                <div className="flex justify-between w-full overflow-hidden">
                  <div className="flex justify-between flex-col items-start">
                    <h4 className="font-semibold text-sm text-ellipsis whitespace-nowrap overflow-hidden">
                      {item.name}
                    </h4>

                    {/* Description */}
                    <div className="text-xs text-gray-500 mt-1 max-w-[200px]">
                      <div
                        className={`leading-snug text-left break-words max-w-[350px] ${
                          !isExpanded && isLong ? "truncate" : ""
                        }`}
                      >
                        {isExpanded || !isLong ? item.description : shortDesc}
                        {isLong && (
                          <div>
                            <button
                              onClick={() =>
                                setExpandedIndex(isExpanded ? null : index)
                              }
                              className="text-orange-500 hover:underline text-xs"
                            >
                              {isExpanded ? "Show less" : "Read more"}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-800">₹{item.price}</p>
                    <button
                      onClick={() => handleDeleteItem(index)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {showItemModal && (
        <div className="fixed inset-0 z-50 flex items-center p-4 justify-center bg-black/40">
          <form
            onSubmit={handleSubmitItem}
            className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
          >
            <h2 className="text-lg font-semibold mb-2 text-center">
              Add New Item
            </h2>

            <input
              className="w-full border px-3 py-2 rounded"
              placeholder="Item Name"
              value={itemForm.name}
              onChange={(e) =>
                setItemForm({ ...itemForm, name: e.target.value })
              }
              required
            />
            <input
              className="w-full border px-3 py-2 rounded"
              type="number"
              placeholder="Price"
              value={itemForm.price}
              onChange={(e) =>
                setItemForm({ ...itemForm, price: e.target.value })
              }
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (file) {
                  const url = await uploadToCloudinary(file);
                  setItemForm((prev) => ({ ...prev, image: url }));
                }
              }}
              className="w-full border px-3 py-2 rounded"
            />

            <textarea
              className="w-full border px-3 py-2 rounded"
              placeholder="Description"
              rows={3}
              value={itemForm.description}
              onChange={(e) =>
                setItemForm({ ...itemForm, description: e.target.value })
              }
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setShowItemModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-black"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-orange-500 text-white px-4 py-2 rounded"
              >
                Add Item
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageMenu;
