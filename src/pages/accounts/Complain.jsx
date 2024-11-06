import React from 'react'
import { useForm } from "react-hook-form";
import { apiConnector } from "../../services/apiConnector";
import { updateDataEndpoint } from "../../services/apis";
import toast from 'react-hot-toast';
import img from "../../asset/complain.jpeg"

const Complain = () => {

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
        updateDataEndpoint.SENT_COMP,
        data
      );
      if (result.data?.success) {
        toast.success("Complain Sent!");
        reset(); 
      } else {
        toast.error(result.data?.message || "Complain not Send");
      }
    } catch (error) {
      console.error("Error sending complain:", error);
      toast.error("Complain Not Sent. Please try again.");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen w-full bg-cover bg-center bg-no-repeat "
      style={{ backgroundImage: `url(${img})` }}
    >
    <div
        className="bg-white bg-opacity-80 flex flex-col items-center p-8 sm:p-10 rounded-lg shadow-lg w-11/12"
      >

      <div className="flex justify-center text-2xl font-semibold mb-1 p-4 animate-bounce border rounded-lg shadow-2xl transition-transform transform hover:scale-105 hover:shadow-2xl">
        Any Complain, Tell us Freely
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-200  bg-opacity-70 shadow-lg rounded-lg p-5 space-y-5 w-11/12"
      >
      <div>
          <label className="block font-medium mb-1">UID</label>
          <input
            type="text"
            {...register("uid", { required: "UID is required" })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Write Your Complain"
          />
          {errors.uid && (
            <p className="text-red-500 text-sm">{errors.uid.message}</p>
          )}
        </div>
        <div>
          <label className="block font-medium mb-1">Complain</label>
          <input
            type="text"
            {...register("note", { required: "Note is required" })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Write Your Complain"
          />
          {errors.note && (
            <p className="text-red-500 text-sm">{errors.note.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit Complain
        </button>
      </form>
      </div>
    </div>
  )
}

export default Complain
