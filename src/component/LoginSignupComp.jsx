import React, { useState, useEffect } from "react";
import ff from "../asset/ff1.jpg";
import pb from "../asset/pb1.jpg";
import "./loginSignupComp.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, sendOtp } from "../services/authAPI";
import { setSignupData } from "../slices/authSlice";

const LoginSignupComp = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(`url(${ff})`);
  useEffect(() => {
    // Array of background image URLs
    const images = [`url(${pb})`, `url(${ff})`];

    let index = 0;
    const changeBackground = () => {
      index = (index + 1) % images.length;
      setBackgroundImage(images[index]);
    };

    const intervalId = setInterval(changeBackground, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    reset: resetLoginForm,
    formState: { errors: loginErrors },
  } = useForm();

  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    reset: resetSignupForm,
    formState: { errors: signupErrors },
  } = useForm();

  const submitSignupForm = async (data) => {
    try {
      dispatch(setSignupData(data));
      dispatch(sendOtp(data.email, navigate));
      resetSignupForm();
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const submitLoginForm = async (data) => {
    try {
      dispatch(login(data.loginEmail, data.loginPassword, navigate));
      resetLoginForm();
    } catch (error) {
      console.log("Error while login:", error);
    }
  };

  return (
    <div
      className="section flex items-center justify-center relative w-full h-full min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: backgroundImage,
        transition: "background-image 1s ease-in-out",
      }}
    >
      <div className="container">
        <div className="flex justify-center space-x-4 my-4">
          <span
            className={`auth-toggle-btn ${
              !isSignup ? "active-btn" : "inactive-btn"
            }`}
            onClick={toggleForm}
          >
            Log In
          </span>
          <span
            className={`auth-toggle-btn ${
              isSignup ? "active-btn" : "inactive-btn"
            }`}
            onClick={toggleForm}
          >
            Sign Up
          </span>
        </div>
        <div className={`card-3d-wrap ${isSignup ? "rotate" : ""}`}>
          {/* Log In Form */}
          <div className="backface-hidden absolute inset-0 bg-gray-800 text-white p-8">
            <div className="text-center">
              <h1 className="styled-heading">Good to See You Again</h1>
              <h4 className="mb-4 text-xl font-semibold">Log In</h4>
              <form onSubmit={handleLoginSubmit(submitLoginForm)}>
                <div className="mb-4 relative">
                  <input
                    type="email"
                    className="form-style"
                    placeholder="Your Email"
                    name="loginEmail"
                    id="loginEmail"
                    {...loginRegister("loginEmail", {
                      required: "Enter your Email",
                    })}
                  />
                  <i className="input-icon uil uil-at text-yellow-300"></i>
                  {loginErrors.loginEmail && (
                    <span className="text-red-500">
                      {loginErrors.loginEmail.message}
                    </span>
                  )}
                </div>
                <div className="mb-4 relative">
                  <input
                    type="password"
                    className="form-style"
                    placeholder="Your Password"
                    name="loginPassword"
                    id="loginPassword"
                    {...loginRegister("loginPassword", {
                      required: "Password is required",
                    })}
                  />
                  <i className="input-icon uil uil-lock-alt text-yellow-300"></i>
                  {loginErrors.loginPassword && (
                    <span className="text-red-500">
                      {loginErrors.loginPassword.message}
                    </span>
                  )}
                </div>
                <button className="btn">Submit</button>
              </form>
              <div className="flex justify-between">
                <Link to={"/"}>
                  <p>Back</p>
                </Link>
                <Link to={"/forgot-password"}>
                  <p>Forgot Password</p>
                </Link>
              </div>
            </div>
          </div>

          {/* Sign Up Form */}
          <div className="backface-hidden absolute inset-0 bg-gray-800 text-white p-5 rotate-y-180">
            <div className="text-center">
              <h4 className="mb-2 signup p-2 text-2xl font-bold">Sign Up</h4>
              <form onSubmit={handleSignupSubmit(submitSignupForm)}>
                <div className="mb-1 relative">
                  <input
                    type="text"
                    className={`form-style ${
                      signupErrors.fullname ? "border-red-500" : ""
                    }`}
                    name="fullname"
                    id="fullname"
                    placeholder="Your Full Name"
                    {...signupRegister("fullname", {
                      required: "Full name is required",
                    })}
                  />
                  <i className="input-icon uil uil-user text-yellow-300"></i>
                  {signupErrors.fullname && (
                    <span className="text-red-500">
                      {signupErrors.fullname.message}
                    </span>
                  )}
                </div>
                <div className="mb-1 relative">
                  <input
                    type="text"
                    className={`form-style ${
                      signupErrors.uid ? "border-red-500" : ""
                    }`}
                    name="uid"
                    id="uid"
                    placeholder="Your U-ID"
                    {...signupRegister("uid", { required: "U-ID is required" })}
                  />
                  <i className="input-icon uil uil-user text-yellow-300"></i>
                  {signupErrors.uid && (
                    <span className="text-red-500">
                      {signupErrors.uid.message}
                    </span>
                  )}
                </div>
                <div className="mb-1 relative">
                  <input
                    type="email"
                    className={`form-style ${
                      signupErrors.email ? "border-red-500" : ""
                    }`}
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    {...signupRegister("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Email format is invalid",
                      },
                    })}
                  />
                  <i className="input-icon uil uil-at text-yellow-300"></i>
                  {signupErrors.email && (
                    <span className="text-red-500">
                      {signupErrors.email.message}
                    </span>
                  )}
                </div>
                <div className="mb-1 relative">
                  <input
                    type="password"
                    className={`form-style ${
                      signupErrors.password ? "border-red-500" : ""
                    }`}
                    name="password"
                    id="password"
                    placeholder="Your Password"
                    {...signupRegister("password", {
                      required: "Password is required",
                    })}
                  />
                  <i className="input-icon uil uil-lock-alt text-yellow-300"></i>
                  {signupErrors.password && (
                    <span className="text-red-500">
                      {signupErrors.password.message}
                    </span>
                  )}
                </div>
                <div className="mb-1 relative">
                  <input
                    type="password"
                    className={`form-style ${
                      signupErrors.confirmPassword ? "border-red-500" : ""
                    }`}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    {...signupRegister("confirmPassword", {
                      required: "Confirm Password is required",
                      // validate: (value) => {
                      //   const { password } = getValues();
                      //   return value === password || "Passwords do not match";
                    })}
                  />
                  <i className="input-icon uil uil-lock-alt text-yellow-300"></i>
                  {signupErrors.confirmPassword && (
                    <span className="text-red-500">
                      {signupErrors.confirmPassword.message}
                    </span>
                  )}
                </div>
                <button type="submit" className="btn">
                  Sent Email
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupComp;