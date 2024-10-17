import React from "react";
import { useForm } from "react-hook-form";
import { sendPasswordOtp } from "../services/authAPI";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitEmailForm = async (data) => {
    try {
      dispatch(sendPasswordOtp(data.email, navigate));
      reset();
    } catch (error) {
      console.error("Error sending OTP:", error);
    }

    return (
      <div>
        <div className="flex flex-col">
          <h1>Forgoten Password Don't Worry</h1>
          <p>Enter Email</p>
          <form
            className="flex flex-col gap-7"
            onSubmit={handleSubmit(submitEmailForm)}
          >
            <label htmlFor="email" className="lable-style">
              First Name
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your email.
              </span>
            )}
            <button type="submit">Sent Email</button>
          </form>
        </div>
      </div>
    );
  };
};

export default ForgotPassword;
