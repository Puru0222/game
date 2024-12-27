import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaExclamationCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { apiConnector } from "../../services/apiConnector";
import { updateDataEndpoint } from "../../services/apis";
import img from "../../asset/add.jpg";

const Complain = () => {
  const { uid } = useSelector((state) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const noteContent = watch("note", "");
  const characterCount = noteContent.length;
  const maxCharacters = 500; // Set your desired maximum

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const toastId = toast.loading("Submitting your complaint...");

    try {
      const result = await apiConnector(
        "POST",
        updateDataEndpoint.SENT_COMP,
        { note: data.note, uid }
      );

      if (result.data?.success) {
        toast.success("Your complaint has been submitted successfully!", {
          icon: '✅',
          duration: 4000,
        });
        reset();
      } else {
        throw new Error(result.data?.message || "Failed to submit complaint");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to submit complaint. Please try again.", {
        icon: '❌',
        duration: 4000,
      });
    } finally {
      toast.dismiss(toastId);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 to-black py-8 p-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 p-6 text-white">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaExclamationCircle />
            Submit a Complaint
          </h2>
          <p className="mt-2 opacity-90">
            We're here to help. Tell us about your concern.
          </p>
        </div>

        {/* Form Section */}
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Describe your complaint
              </label>
              <div className="relative">
                <textarea
                  {...register("note", {
                    required: "Please describe your complaint",
                    minLength: {
                      value: 5,
                      message: "Please provide more details (minimum 5 characters)",
                    },
                    maxLength: {
                      value: maxCharacters,
                      message: `Maximum ${maxCharacters} characters allowed`,
                    },
                  })}
                  className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 min-h-[100px] ${
                    errors.note ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Please provide detailed information about your complaint..."
                />
                <div className="absolute bottom-3 right-3 text-sm text-gray-500">
                  {characterCount}/{maxCharacters}
                </div>
              </div>
              <AnimatePresence>
                {errors.note && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-2 text-red-500 flex items-center gap-1"
                  >
                    <FaExclamationCircle />
                    {errors.note.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Guidelines */}
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
              <h3 className="font-semibold mb-2">Guidelines for submitting a complaint:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Be specific about the issue you're facing</li>
                <li>Include relevant details (dates, transaction IDs, etc.)</li>
                <li>Keep your language professional and clear</li>
                <li>Avoid sharing sensitive personal information</li>
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
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  Submitting...
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  Submit Complaint
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Complain;