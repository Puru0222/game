import React, { useState } from "react";
import "./loginSignupComp.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, sendOtp } from "../services/authAPI";
import { setSignupData } from "../slices/authSlice";

const LoginSignupComp = () => {
  const [isSignup, setIsSignup] = useState(false);

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
      dispatch(sendOtp(data.email, data.uid, navigate));
      resetSignupForm();
    } catch (error) {}
  };

  const submitLoginForm = async (data) => {
    try {
      dispatch(login(data.loginEmail, data.loginPassword, navigate));
      resetLoginForm();
    } catch (error) {}
  };

  return (
    <div className="section flex items-center justify-center relative w-full h-full min-h-screen">
      <div className="container mb-10">
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
          <div className="backface-hidden absolute inset-0 text-white p-8">
            <div className="text-center">
              <h1 className="styled-heading animate-bounce">
                Good to See You Again
              </h1>
              <form onSubmit={handleLoginSubmit(submitLoginForm)}>
                <div className="mb-4 relative">
                  <label htmlFor="email"> Enter Your Email</label>
                  <input
                    type="email"
                    className="form-style"
                    placeholder="Email"
                    name="loginEmail"
                    id="loginEmail"
                    {...loginRegister("loginEmail", {
                      required: "Enter your Email",
                    })}
                  />
                  <i className="input-icon uil uil-at text-blue-500"></i>
                  {loginErrors.loginEmail && (
                    <span className="text-red-500">
                      {loginErrors.loginEmail.message}
                    </span>
                  )}
                </div>
                <div className="mb-4 relative">
                  <label htmlFor="password">Enter Password</label>
                  <input
                    type="password"
                    className="form-style"
                    placeholder="Password"
                    name="loginPassword"
                    id="loginPassword"
                    {...loginRegister("loginPassword", {
                      required: "Password is required",
                    })}
                  />
                  <i className="input-icon uil uil-lock-alt text-blue-500"></i>
                  {loginErrors.loginPassword && (
                    <span className="text-red-500">
                      {loginErrors.loginPassword.message}
                    </span>
                  )}
                </div>
                <button className="btn text-white animate-breathe">
                  Log in
                </button>
              </form>
              <div className="flex mt-5 justify-between items-center p-3 border border-gray-300 rounded-md bg-gradient-to-r from-gray-200 to-gray-300 transition-all duration-500">
                <Link
                  to={"/"}
                  className="relative text-blue-500 hover:text-white px-3 py-2 rounded-md transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600"
                >
                  <p className="text-md font-semibold">Back</p>
                </Link>
                <Link
                  to={"/forgot-password"}
                  className="relative text-blue-500 hover:text-white py-2 px-3 rounded-md transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600"
                >
                  <p className="text-md font-semibold">Forgot Password</p>
                </Link>
              </div>
            </div>
          </div>

          {/* Sign Up Form */}
          <div className="backface-hidden absolute inset-0 text-white p-5 rotate-y-180">
            <div className="text-center">
              <h4 className="mb-2 signup p-2 text-2xl font-bold animate-bounce">
                Sign Up
              </h4>
              <form onSubmit={handleSignupSubmit(submitSignupForm)}>
                <div className="mb-1 relative">
                  <input
                    type="text"
                    className={`form-style ${
                      signupErrors.fullname ? "border-red-500" : ""
                    }`}
                    name="fullname"
                    id="fullname"
                    placeholder="In Game Name"
                    {...signupRegister("fullname", {
                      required: "Full name is required",
                    })}
                  />
                  <i className="input-icon uil uil-user text-blue-500"></i>
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
                    placeholder="UID"
                    {...signupRegister("uid", { required: "U-ID is required" })}
                  />
                  <i className="input-icon uil uil-user text-blue-500"></i>
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
                    placeholder="Email"
                    {...signupRegister("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Email format is invalid",
                      },
                    })}
                  />
                  <i className="input-icon uil uil-at text-blue-500"></i>
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
                    placeholder="Password"
                    {...signupRegister("password", {
                      required: "Password is required",
                    })}
                  />
                  <i className="input-icon uil uil-lock-alt text-blue-500"></i>
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
                  <i className="input-icon uil uil-lock-alt text-blue-500"></i>
                  {signupErrors.confirmPassword && (
                    <span className="text-red-500">
                      {signupErrors.confirmPassword.message}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn text-white animate-breathe"
                >
                  Send OTP
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
