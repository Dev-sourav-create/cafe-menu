import React, { useState, useEffect } from "react";
import { db } from "../firbase";
import QRCode from "qrcode"; // ✅ Import qrcode (not react-qrcode)
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
  const [qrLinks, setQrLinks] = useState({}); // { tableId: QRDataURL }

  const [expandedId, setExpandedId] = useState(null);

  // Fetch tables and generate QR links
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

        // Generate QR codes for each table
        const newQrLinks = {};
        for (let table of tableArray) {
          const link = `${
            import.meta.env.VITE_BASE_URL
          }/order?table=${encodeURIComponent(table.name)}`;
          const qrDataURL = await QRCode.toDataURL(link); // generate image URL
          newQrLinks[table.id] = qrDataURL;
          console.log(link);
        }
        setQrLinks(newQrLinks);
      } catch (error) {
        console.log(error);
      }
    };
    getTables();
  }, []);

  // add new table
  const addNewTable = async () => {
    const newTable = {
      id: tables.length + 1,
      name: `table${tables.length + 1}`,
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
      console.log(link);
    } catch (error) {
      console.log(error);
    }
  };

  // delete a table
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
      console.log(error);
    }
  };
  return (
    <div className="">
      <button
        onClick={addNewTable}
        className=" text-orange-500 border-1 border-orange-500 px-6 py-2 mt-4 m-2 rounded-lg"
      >
        + Add
      </button>
      <button
        onClick={deleteTable}
        className="bg-white text-gray-500  border-gray-400 border-1 px-6 py-2 mt-4 m-2 rounded-lg"
      >
        Delete
      </button>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-8">
        {tables.map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              onClick={() => setExpandedId(isExpanded ? null : item.id)}
              className={`relative border border-gray-500 rounded-xl m-2  cursor-pointer transition-all duration-300 ease-in-out overflow-hidden ${
                isExpanded ? "h-52 p-4" : "h-36 p-2"
              }`}
            >
              <h3 className={`text-center text-gray-600 mt-2  transition-all `}>
                {item.name}
              </h3>

              {isExpanded && (
                <div className="mt-3 text-center flex justify-center text-gray-600 text-sm transition-opacity duration-300 opacity-100">
                  {qrLinks[item.id] && (
                    <img src={qrLinks[item.id]} alt="QR Code" width={200} />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManageTables;
