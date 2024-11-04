import React from "react";
import img from "../../asset/puruupi.png";
import toast from "react-hot-toast";

const Add = () => {
  const handleCopy = () => {
    navigator.clipboard.writeText("puru0222@upi");
    toast.success("UPI ID copied !");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-200 text-gray-800">
      <h2 className="text-2xl font-semibold">Add Money to Your Wallet</h2>
      <p className="p-5 px-8 text-center font-medium">
        To add money, scan the QR code below and send the amount with your
        unique UID in the note.
      </p>
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
        <img src={img} alt="UPI QR Code" className="w-48 h-48 mb-4" />
        <div className="text-lg font-semibold">
          UPI: <span className="text-blue-600">puru0222@upi</span>
        </div>
        <button
          onClick={handleCopy}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Copy UPI ID
        </button>
      </div>
    </div>
  );
};

export default Add;
