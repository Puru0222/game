import React from "react";
import { useForm } from "react-hook-form";
import { sendPasswordOtp } from "../services/authAPI";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEmail } from "../slices/authSlice";
import img from "../asset/forgottenpass.webp";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitEmailForm = async (data) => {
    try {
      dispatch(setEmail(data.email));
      dispatch(sendPasswordOtp(data.email, navigate));
      reset();
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div
        className="bg-white bg-opacity-80 p-8 sm:p-10 rounded-lg shadow-lg w-full transform transition-all hover:scale-105 hover:shadow-2xl hover:-translate-y-2
                   max-w-80 sm:max-w-lg md:max-w-xl lg:max-w-2xl"
      >
        <h1 className="text-4xl font-semibold text-gray-700 mb-4 text-center">
          Forgotten Password? Don’t Worry
        </h1>
        <p className="text-gray-500 text-center mb-6">Enter your email below</p>

        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmit(submitEmailForm)}
        >
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-600 mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-300"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">
                Please enter your email.
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 text-white py-5 rounded-md hover:bg-yellow-500 transition-all duration-300 font-medium"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
