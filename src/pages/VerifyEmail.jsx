import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { FiMail } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../services/authAPI";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    if (!signupData) {
      navigate("/loginSignup");
    }
  }, []);

  useEffect(() => {
    const timer =
      countdown > 0 && setInterval(() => setCountdown(countdown - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const { fullname, uid, email, password, confirmPassword } = signupData;
    dispatch(
      signUp(fullname, uid, email, password, confirmPassword, otp, navigate)
    );
  };

  const handleResendOtp = () => {
    dispatch(sendOtp(signupData.email));
    setCountdown(30);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center"
        >
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-blue-500/20"
        >
          {/* Header Section */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 bg-blue-600/30 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <FiMail className="text-blue-300 text-3xl" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Verify Email</h1>
            <p className="text-gray-300">
              We've sent a verification code to your email
            </p>
            {signupData?.email && (
              <p className="text-blue-400 font-medium mt-2">
                {signupData.email}
              </p>
            )}
          </div>

          {/* OTP Form */}
          <form onSubmit={handleVerifyAndSignup} className="space-y-6">
            <div className="space-y-4">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props) => (
                  <input
                    {...props}
                    placeholder="•"
                    className="w-12 h-12 text-center text-white bg-white/10 border border-blue-500/30 rounded-lg text-xl font-bold focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none mx-1"
                  />
                )}
                containerStyle="flex justify-center gap-2"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Verify Email
            </motion.button>
          </form>

          {/* Footer Actions */}
          <div className="mt-8 flex justify-between items-center">
            <Link
              to="/loginSignup"
              className="text-blue-300 hover:text-white flex items-center gap-2 transition-colors duration-200 group"
            >
              <BiArrowBack className="group-hover:transform group-hover:-translate-x-1 transition-transform" />
              Back to Signup
            </Link>
            <button
              onClick={handleResendOtp}
              disabled={countdown > 0}
              className={`text-blue-300 hover:text-white flex items-center gap-2 transition-colors duration-200 group ${
                countdown > 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <RxCountdownTimer className="group-hover:rotate-180 transition-transform duration-500" />
              {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
            </button>
          </div>

          <div className="mt-8">
            <div className="w-full bg-gray-700 rounded-full h-1">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: otp.length * 16.66 + "%" }}
                className="bg-blue-500 h-1 rounded-full transition-all duration-300"
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default VerifyEmail;
