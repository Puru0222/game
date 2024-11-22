import React from "react";
import img from "../../asset/puruupi.png";
import toast from "react-hot-toast";
import img1 from "../../asset/2.jpg";
import img2 from "../../asset/add.jpg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

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

  const [backgroundImage, setBackgroundImage] = useState(`url(${img1})`);
  useEffect(() => {
    // Array of background image URLs
    const images = [`url(${img1})`, `url(${img2})`];
    let index = 0;
    const changeBackground = () => {
      index = (index + 1) % images.length;
      setBackgroundImage(images[index]);
    };
    const intervalId = setInterval(changeBackground, 4000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="flex transition-all duration-300 flex-col justify-center items-center h-screen w-full bg-cover bg-center bg-no-repeat text-black p-4"
      style={{
        backgroundImage: backgroundImage,
        transition: "background-image  ease-in-out",
      }}
    >
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
        <Link to={"/payment"}>
          <button className="px-6 py-3 lg:mt-4 sm:mt-3 bg-yellow-500 text-yellow-50 font-bold rounded-full shadow-lg hover:bg-yellow-700 transition duration-300">
            Add Money Only By UPI Lite
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Add;
