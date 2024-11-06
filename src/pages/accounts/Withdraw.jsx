import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { apiConnector } from "../../services/apiConnector";
import { updateDataEndpoint } from "../../services/apis";
import img1 from "../../asset/bgimg.png"

const Withdraw = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Loading...");
    try {
      const result = await apiConnector(
        "POST",
        updateDataEndpoint.SENT_EMAIL,
        data
      );
      if (result.data?.success) {
        toast.success("Request Sent!");
        reset(); 
      } else {
        toast.error(result.data?.message || "Request failed.");
      }
    } catch (error) {
      console.error("Error sending request:", error);
      toast.error("Request Not Sent. Please try again.");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen w-full bg-cover bg-center bg-no-repeat text-black p-4"
      style={{ backgroundImage: `url(${img1})` }}
    >
      <div
        className="bg-white bg-opacity-60 flex flex-col items-center p-8 sm:p-10 rounded-lg shadow-lg w-11/12"
      >

      <h2 className="text-2xl font-semibold mb-4 p-4 animate-breathe border bg-white rounded-lg shadow-2xl">
        Withdraw Money
      </h2>
      <p className="mb-4 text-center font-medium">
        To withdraw money, please enter your details.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-5 space-y-2 w-full max-w-md"
      >
        <div>
          <label className="block font-medium mb-1">UID</label>
          <input
            type="text"
            {...register("uid", { required: "UID is required" })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your UID"
          />
          {errors.uid && (
            <p className="text-red-500 text-sm">{errors.uid.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">UPI ID</label>
          <input
            type="text"
            {...register("upiId")}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your UPI ID (optional)"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Amount</label>
          <input
            type="number"
            {...register("amount", {
              required: "Amount is required",
              min: { value: 50, message: "Amount must be Greater than 50" },
            })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter the amount to withdraw"
          />
          {errors.amount && (
            <p className="text-red-500 text-sm">{errors.amount.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit Withdrawal Request
        </button>
      </form>
      </div>
    </div>
  );
};

export default Withdraw;
