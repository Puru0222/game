// frontend/src/components/PaymentForm.js
import React, { useState } from "react";
import { initiateUPIPayment } from "../../services/payment";
import { useSelector } from "react-redux";
import img1 from "../../asset/2.jpg";
import img2 from "../../asset/add.jpg";
import { useEffect } from "react";

const PaymentForm = () => {
  const [amount, setAmount] = useState("");
  const [app, setApp] = useState("GooglePay"); // Default selection
  const { uid } = useSelector((state) => state.auth);

  const handlePayment = () => {
    initiateUPIPayment(amount, uid, app);
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
      <div className="max-w-md mx-auto p-8 bg-white bg-opacity-60 shadow-lg rounded-lg mt-10">
        <h2 className="text-2xl font-semibold text-center animate-breathe text-gray-800 mb-6">
          ADD MONEY
        </h2>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* <input
        type="text"
        value={uid}
        onChange={(e) => setUid(e.target.value)}
        placeholder="Enter UID"
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      /> */}

        <select
          value={app}
          onChange={(e) => setApp(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="GooglePay">Google Pay</option>
          <option value="PhonePe">PhonePe</option>
          <option value="Paytm">Paytm</option>
          <option value="Other">Other UPI App</option>
        </select>

        <button
          onClick={handlePayment}
          className="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors"
        >
          Only Pay By UPI LITE
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;
