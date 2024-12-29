import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  FaQrcode,
  FaCopy,
  FaDownload,
  FaRupeeSign,
  FaArrowAltCircleLeft,
} from "react-icons/fa";
import img from "../../asset/puruupi.png";

const Add = () => {
  const [isQrEnlarged, setIsQrEnlarged] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("gamechallenger@upi");
    toast.success("UPI ID copied to clipboard!", {
      icon: "📋",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = img;
    link.download = "UPI_QR_Code.png";
    link.click();
    toast.success("QR Code downloaded!", {
      icon: "⬇️",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black py-6 p-2 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white">
          <h2 className="text-2xl place-items-center text-center font-bold flex items-center gap-2">
            <FaRupeeSign className="text-xl text-center" />
            Add Money to Wallet
          </h2>
          <p className="mt-2 opacity-90">
            Scan QR code or use UPI ID to add funds
          </p>
        </div>
        {/* Instructions */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">
            How to add money:
          </h3>
          <ol className="list-decimal list-inside text-sm text-blue-700 space-y-1">
            <li>Scan the QR code or copy UPI ID</li>
            <li>Enter the amount you want to add</li>
            <li className="text-red-600 font-bold flex items-center">
              Add your UID in the payment note
              <FaArrowAltCircleLeft className="ml-1" />
              <strong className="mx-1 animate-ping">IMPORTANT</strong>
            </li>
            <li>Complete the payment</li>
          </ol>
        </div>

        {/* UPI ID Section */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-gray-600 text-sm mb-1">UPI ID</p>
          <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
            <span className="font-mono text-blue-600">gamechallenger@upi</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaCopy className="text-blue-600" />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="p-2 space-y-4">
          {/* QR Code Section */}
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ scale: 1.02 }}
          >
            <div
              className="relative cursor-pointer"
              onClick={() => setIsQrEnlarged(!isQrEnlarged)}
            >
              <motion.img
                src={img}
                alt="UPI QR Code"
                className="w-48 h-48 rounded-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 rounded-lg transition-all duration-300 flex items-center justify-center">
                <FaQrcode className="text-3xl text-white opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* Download Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-full flex items-center gap-2 hover:bg-green-700 transition-colors"
            >
              <FaDownload /> Download QR
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Enlarged QR Code Modal */}
      <AnimatePresence>
        {isQrEnlarged && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setIsQrEnlarged(false)}
          >
            <motion.img
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              src={img}
              alt="UPI QR Code"
              className="max-w-md w-3/4 rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Add;
