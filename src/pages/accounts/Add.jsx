import React from "react";
import img from "../../asset/puruupi.png";
import toast from "react-hot-toast";
import img2 from "../../asset/add.jpg";

const Add = () => {
  const handleCopy = () => {
    navigator.clipboard.writeText("gamechallenger@upi");
    toast.success("UPI ID copied!");
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = img;
    link.download = "UPI_QR_Code.png";
    link.click();
  };

  return (
    <div
      className="flex transition-all duration-300 flex-col justify-center items-center h-screen w-full bg-cover bg-center bg-no-repeat text-black p-4"
      style={{ backgroundImage: `url(${img2})` }}
    >
      <div className="bg-white bg-opacity-60 flex flex-col items-center p-8 sm:p-10 rounded-lg shadow-lg w-11/12">
        <h2 className="text-2xl font-semibold">Add Money to Your Wallet</h2>
        <p className="p-5 px-8 text-center font-medium">
          To add money, scan the QR code below and send the amount with your
          unique UID in the note.
        </p>
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center bg-opacity-80">
          <img src={img} alt="UPI QR Code" className="w-48 h-48" />
          <button
            onClick={handleDownload}
            className="mt-2 mb-5 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Download QR Code
          </button>
          <div className="text-lg font-semibold text-black">
            UPI: <span className="text-blue-600">gamechallenger@upi</span>
          </div>
          <button
            onClick={handleCopy}
            className="mt-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Copy UPI ID
          </button>
        </div>
      </div>
    </div>
  );
};

export default Add;
