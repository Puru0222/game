import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FaWallet, FaRupeeSign, FaInfoCircle, FaMoneyBillWave } from "react-icons/fa";
import toast from "react-hot-toast";
import { apiConnector } from "../../services/apiConnector";
import { updateDataEndpoint } from "../../services/apis";

const Withdraw = () => {
  const { balance, uid } = useSelector((state) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const watchAmount = watch("amount", 0);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const toastId = toast.loading("Processing withdrawal request...");

    try {
      const result = await apiConnector(
        "POST",
        updateDataEndpoint.SENT_EMAIL,
        { upiId: data.upiId, amount: data.amount, uid }
      );

      if (result.data?.success) {
        toast.success("Withdrawal request submitted successfully!", {
          icon: '💰',
          duration: 4000,
        });
        reset();
      } else {
        throw new Error(result.data?.message || "Withdrawal request failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to process withdrawal. Please try again.", {
        icon: '❌',
        duration: 4000,
      });
    } finally {
      toast.dismiss(toastId);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black py-8 p-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaMoneyBillWave />
            Withdraw Funds
          </h2>
          <div className="mt-2 flex items-center justify-between">
            <p className="opacity-90">Available Balance</p>
            <div className="text-2xl font-bold flex items-center">
              <FaRupeeSign className="text-xl" />
              {balance}
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* UPI ID Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                UPI ID / Phone Number
              </label>
              <input
                type="text"
                {...register("upiId", {
                  required: "UPI ID or Phone Number is required",
                  
                })}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                  errors.upiId ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter UPI ID or Phone Number"
              />
              <AnimatePresence>
                {errors.upiId && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-2 text-red-500 flex items-center gap-1"
                  >
                    <FaInfoCircle />
                    {errors.upiId.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Amount Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Withdrawal Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">
                  <FaRupeeSign />
                </span>
                <input
                  type="number"
                  {...register("amount", {
                    required: "Amount is required",
                    min: { value: 50, message: "Minimum withdrawal amount is ₹50" },
                    max: { value: balance, message: "Amount exceeds available balance" },
                  })}
                  className={`w-full p-3 pl-8 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                    errors.amount ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter amount"
                />
              </div>
              <AnimatePresence>
                {errors.amount && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-2 text-red-500 flex items-center gap-1"
                  >
                    <FaInfoCircle />
                    {errors.amount.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Withdrawal Info */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 flex items-center gap-2">
                <FaInfoCircle />
                Withdrawal Information
              </h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Minimum withdrawal amount: ₹10</li>
                <li>• Processing time: 45-60 Minuts</li>
                <li>• Ensure UPI ID is correct</li>
                <li>• Available balance: ₹{balance}</li>
              </ul>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center gap-2 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  Processing...
                </>
              ) : (
                <>
                  <FaWallet />
                  Withdraw ₹{watchAmount || 0}
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Withdraw;