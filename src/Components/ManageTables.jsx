import React, { useState, useEffect } from "react";
import { db } from "../firbase";
import QRCode from "qrcode";
import toast from "react-hot-toast";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore";

const ManageTables = () => {
  const [tables, setTables] = useState([]);
  const [qrLinks, setQrLinks] = useState({});
  const [selectedQR, setSelectedQR] = useState(null); // For popup modal
  const [selectedTable, setSelectedTable] = useState(null); // For popup title

  useEffect(() => {
    const getTables = async () => {
      try {
        const tableRef = collection(db, "tables");
        const tableDoc = await getDocs(tableRef);
        const tableArray = tableDoc.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTables(tableArray);

        const newQrLinks = {};
        for (let table of tableArray) {
          const link = `${
            import.meta.env.VITE_BASE_URL
          }/order?table=${encodeURIComponent(table.name)}`;
          const qrDataURL = await QRCode.toDataURL(link);
          newQrLinks[table.id] = qrDataURL;
        }
        setQrLinks(newQrLinks);
      } catch (error) {
        console.error(error);
      }
    };

    getTables();
  }, []);
  console.log(qrLinks);

  const addNewTable = async () => {
    const newTable = {
      id: tables.length + 1,
      name: `Table${tables.length + 1}`,
      order: [],
    };

    try {
      await setDoc(doc(db, "tables", newTable.id.toString()), newTable);
      setTables([...tables, newTable]);
      const link = `${
        import.meta.env.VITE_BASE_URL
      }/order?table=${encodeURIComponent(newTable.name)}`;
      const qrDataURL = await QRCode.toDataURL(link);
      setQrLinks((prev) => ({ ...prev, [newTable.id]: qrDataURL }));
      toast.success(`${newTable.name} added`);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTable = async () => {
    if (tables.length === 0) return;

    const lastTable = tables[tables.length - 1];
    try {
      await deleteDoc(doc(db, "tables", lastTable.id.toString()));
      setTables(tables.slice(0, -1));
      const updatedLinks = { ...qrLinks };
      delete updatedLinks[lastTable.id];
      setQrLinks(updatedLinks);
      toast.success(`${lastTable.name} deleted`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTableClick = (table) => {
    setSelectedTable(table.name);
    setSelectedQR(qrLinks[table.id]);
  };

  const closeModal = () => {
    setSelectedQR(null);
    setSelectedTable(null);
  };

  const downloadQR = () => {
    const link = document.createElement("a");
    link.href = selectedQR;
    link.download = `${selectedTable}_QR.png`;
    link.click();
  };

  return (
    <div className="mt-2">
      <div className="flex justify-end lg:justify-start px-8">
        <button
          onClick={addNewTable}
          className="text-orange-500 border border-orange-500 px-6 py-2 mt-4 m-2 rounded-lg"
        >
          + Add
        </button>
        <button
          onClick={deleteTable}
          className="bg-white text-gray-500 border border-gray-400 px-6 py-2 mt-4 m-2 rounded-lg"
        >
          Delete
        </button>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 p-8">
        {tables.map((item) => (
          <div
            key={item.id}
            onClick={() => handleTableClick(item)}
            className="relative border flex items-center justify-center border-gray-400 rounded-xl m-2 cursor-pointer transition-all duration-300 ease-in-out overflow-hidden hover:shadow-md bg-white h-32"
          >
            <h3 className="text-gray-700 font-medium">{item.name}</h3>
          </div>
        ))}
      </div>

      {/* QR Popup Modal */}
      {selectedQR && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full relative text-center"
            onClick={(e) => e.stopPropagation()} // Prevent close on inside click
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              {selectedTable}
            </h2>
            <img
              src={selectedQR}
              alt="QR Code"
              className="mx-auto w-48 h-48 border border-gray-200 rounded-lg"
            />
            <button
              onClick={downloadQR}
              className="mt-4 px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Download QR
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTables;
