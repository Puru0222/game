import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { FiLock, FiMail } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { updatePassword } from "../services/authAPI";
import { motion } from "framer-motion";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-blue-500/20"
      >
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-blue-600/30 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <FiLock className="text-blue-300 text-3xl" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
          <p className="text-gray-300">Enter your new password and OTP</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-white placeholder-gray-400"
                placeholder="Enter new password"
              />
              <FiLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {errors.password && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm"
              >
                {errors.password.message}
              </motion.p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-white placeholder-gray-400"
                placeholder="Confirm new password"
              />
              <FiLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {errors.confirmPassword && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm"
              >
                {errors.confirmPassword.message}
              </motion.p>
            )}
          </div>

          {/* OTP Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Enter OTP
            </label>
            <div className="relative">
              <input
                type="text"
                {...register("otp", {
                  required: "OTP is required",
                  pattern: {
                    value: /^\d{6}$/,
                    message: "OTP must be a 6-digit number",
                  },
                })}
                className="w-full px-4 py-3 bg-white/10 border border-blue-500/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-white placeholder-gray-400"
                placeholder="Enter 6-digit OTP"
              />
              <FiMail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {errors.otp && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm"
              >
                {errors.otp.message}
              </motion.p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Reset Password
          </motion.button>
        </form>

        <div className="flex justify-between items-center mt-6">
          <Link
            to="/loginSignup"
            className="text-blue-300 hover:text-white flex items-center gap-2 transition-colors duration-200 group"
          >
            <BiArrowBack className="group-hover:transform group-hover:-translate-x-1 transition-transform" />
            Back to Login
          </Link>
          <button className="text-blue-300 hover:text-white flex items-center gap-2 transition-colors duration-200 group">
            <RxCountdownTimer className="group-hover:rotate-180 transition-transform duration-500" />
            Resend OTP
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default VerifyEmailPass;
