// frontend/src/components/PaymentForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import img1 from "../../asset/2.jpg";
import img2 from "../../asset/add.jpg";
import { apiConnector } from "../../services/apiConnector";
import { endpoints } from "../../services/apis";

const PaymentForm = () => {
  const [amount, setAmount] = useState("");
  const [qrCodeURL, setQRCodeURL] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(`url(${img1})`);
  const { uid } = useSelector((state) => state.auth);

  useEffect(() => {
    const images = [`url(${img1})`, `url(${img2})`];
    let index = 0;
    const intervalId = setInterval(() => {
      index = (index + 1) % images.length;
      setBackgroundImage(images[index]);
    }, 4000);
    return () => clearInterval(intervalId);
  }, []);

  const handlePayment = async () => {
    const dataToSend = {
      amount,
      uid,
    };
    try {
      const response = await apiConnector("POST", endpoints.PAYMENT, dataToSend);
      setQRCodeURL(response.data.qrCodeURL);
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: backgroundImage,
        transition: "background-image ease-in-out",
      }}
    >
      <div className="max-w-md mx-auto p-8 bg-white bg-opacity-60 shadow-lg rounded-lg mt-10">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          ADD MONEY
        </h2>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
        />

        <button
          onClick={handlePayment}
          className="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700"
        >
          Generate QR Code
        </button>

        {qrCodeURL && (
          <div className="mt-6 text-center">
            <p>Scan the QR Code to complete payment:</p>
            <img src={qrCodeURL} alt="UPI QR Code" className="mt-4 mx-auto" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
