import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useForm } from "react-hook-form";
import { updatePassword } from "../services/authAPI";
import img from "../asset/verifyemail.webp"

function VerifyEmailPass() {
  const { emailData } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = watch("password");

  const onSubmit = (data) => {
    try {
      // Dispatching updatePassword action
      dispatch(updatePassword(emailData, data.otp, data.password, navigate));
      reset();
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  useEffect(() => {
    if (!emailData) {
      navigate("/loginSignup");
    }
  }, []);

  return (
    <div
      className="flex justify-center items-center h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div
        className="bg-white bg-opacity-80 p-4 rounded-lg shadow-lg w-full max-w-80 sm:max-w-lg md:max-w-xl lg:max-w-2xl"
      >
        <div className="flex flex-col gap-y-5">

          {/* Form Section */}
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-4 text-center">
              Reset Your Password
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {/* Password field */}
              <label htmlFor="password" className="text-gray-600 font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-300"
                {...register("password", { required: "Password is required" })}
                placeholder="Enter your password"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}

              {/* Confirm Password field */}
              <label
                htmlFor="confirmPassword"
                className="text-gray-600 font-medium"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-300"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </span>
              )}

              {/* OTP Field */}
              <label htmlFor="otp" className="text-gray-600 font-medium">
                Enter OTP (6 digits)
              </label>
              <input
                type="text"
                id="otp"
                className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-300"
                {...register("otp", {
                  required: "OTP is required",
                  pattern: {
                    value: /^\d{6}$/,
                    message: "OTP must be a 6-digit number",
                  },
                })}
                placeholder="Enter OTP"
              />
              {errors.otp && (
                <span className="text-red-500 text-sm">{errors.otp.message}</span>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-yellow-400 text-white py-2 rounded-md hover:bg-yellow-500 transition-all duration-300 font-medium"
              >
                Update Password
              </button>
            </form>
          </div>
          <div className="flex justify-between items-center">

          {/* Back Link */}
          <Link to="/loginSignup" className="relative text-blue-500 hover:text-white p-2 rounded-md transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600"
                >
            <p className="text-richblack-5 flex items-center gap-x-2">
              <BiArrowBack /> Back To Signup
            </p>
          </Link>
          {/* Resend OTP */}
          <button className="flex items-center gap-x-2 text-blue-500 hover:text-white p-2 rounded-md transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600">
            <RxCountdownTimer /> Resend Otp
          </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailPass;
