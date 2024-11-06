import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../services/authAPI";
import { useNavigate } from "react-router-dom";
import img from "../asset/verifysignup.webp";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/loginSignup");
    }
  }, []);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const { fullname, uid, email, password, confirmPassword } = signupData;

    dispatch(
      signUp(fullname, uid, email, password, confirmPassword, otp, navigate)
    );
  };

  return (
    <div
      className="flex justify-center items-center h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${img})` }}
    >
      {loading ? (
        <div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="bg-white bg-opacity-80 p-4 w-11/12 mb-8 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl hover:-translate-y-2">
          <h1 className="text-richblack-5 font-bold text-[1.875rem] leading-[2.375rem] text-center">
            Verify Email
          </h1>
          <p className="text-[1.125rem] font-semibold leading-[1.625rem] m-5 text-richblack-100">
            A verification code has been sent to you. Enter the code below
          </p>
          <form
            onSubmit={handleVerifyAndSignup}
            className="mt-10 flex flex-col items-center gap-6"
          >
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full max-w-80 sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-richblack-800 rounded-lg text-richblack-5 aspect-square text-center text-xl font-semibold transition-all duration-200 focus:ring-2 focus:ring-yellow-400 focus:outline-none hover:scale-105 hover:ring-2 hover:ring-yellow-400"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
                display: "flex",
                maxWidth: "400px",
                margin: "0 auto",
              }}
            />
            <button
              type="submit"
              className="w-full bg-yellow-400 text-white mt-3 py-2 rounded-md hover:bg-yellow-500 transition-all duration-300 font-medium"
            >
              Verify Email
            </button>
          </form>
          <div className="mt-8 mb-5 flex items-center justify-between">
            <Link to="/loginSignup">
              <p className="relative flex items-center gap-2 text-blue-500 hover:text-white p-2 rounded-md transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600">
                <BiArrowBack /> Back To Signup
              </p>
            </Link>
            <button
              className="flex items-center gap-x-2 text-blue-500 hover:text-white p-2 rounded-md transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600"
              onClick={() => dispatch(sendOtp(signupData.email))}
            >
              <RxCountdownTimer />
              Resend otp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
