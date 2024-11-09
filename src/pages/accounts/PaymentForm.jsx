// frontend/src/components/PaymentForm.js
import React, { useState } from "react";
import { initiateUPIPayment } from "../../services/payment";
import { useSelector } from "react-redux";

const PaymentForm = ({ userId }) => {
  const [amount, setAmount] = useState("");
  const [app, setApp] = useState("GooglePay"); // Default selection
  const { uid } = useSelector((state) => state.auth);

  const handlePayment = () => {
    initiateUPIPayment(amount, uid, userId, app);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Send Payment
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
        Pay Now
      </button>
    </div>
  );
};

export default PaymentForm;
