import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";

//   const handleVerifyAndSignup = (e) => {
//     e.preventDefault();
//     const { fullname, uid, email, password, confirmPassword } = signupData;

//     dispatch(
//       signUp(fullname, uid, email, password, confirmPassword, otp, navigate)
//     );


  function VerifyEmailPass() {
    const [otp, setOtp] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
      <div className="flex">
        <div className="flex flex-col gap-y-10">
          <Link to="/loginSignup">
            <p className="text-richblack-5 flex items-center gap-x-2">
              <BiArrowBack /> Back To Signup
            </p>
          </Link>
          <button
            className="flex items-center text-blue-100 gap-x-2"
          >
            <RxCountdownTimer />
            Resend it
          </button>
        </div>
      </div>
    );
  }

export default VerifyEmailPass;
