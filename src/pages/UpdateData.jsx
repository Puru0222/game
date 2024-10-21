import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateBalance } from "../services/dataUpdateAPI";

const UpdateData = () => {
  const { fullname, uid, balance, email } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    register: uidRegister,
    handleSubmit: handleUidSubmit,
    formState: { errors: uidErrors },
  } = useForm();
  const {
    register: balanceRegister,
    handleSubmit: handleBalanceSubmit,
    reset: resetBalanceForm,
    formState: { errors: balanceErrors },
  } = useForm();

  const submitUidForm = async (data) => {
    try {
      dispatch(getUser(data.uid));
    } catch (error) {
      console.error("Error finding user:", error);
    }
  };
  const submitBalanceForm = async (data) => {
    try {
      dispatch(updateBalance(data.uid, data.balance));
      resetBalanceForm();
    } catch (error) {
      console.error("Error Updating balance:", error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-300 h-screen w-full">
      <div className="bg-gray-100 p-8 sm:p-10 rounded-lg shadow-lg w-full max-w-80 sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <h1 className="text-2xl font-semibold mb-3 text-center">
          Search For UID
        </h1>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleUidSubmit(submitUidForm)}
        >
          <div className="flex flex-col">
            <label htmlFor="uid" className="text-gray-600 font-medium">
              UID
            </label>
            <input
              type="text"
              name="uid"
              id="uid"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-300"
              placeholder="Enter uid"
              {...uidRegister("uid", { required: true })}
            />
            {uidErrors.uid && (
              <span className="text-red-500 text-sm mt-1">
                UID likho tb khojna.
              </span>
            )}
          </div>
          <button
            type="submit"
            className="hover:text-white transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 mb-2 bg-blue-400 rounded p-1"
          >
            Search
          </button>
        </form>
        <hr className="border-gray-400 mb-2" />
        <div className="flex flex-col bg-white p-4 rounded-lg shadow-md mb-2">
          <div className="flex justify-between items-center mb-1">
            <p className="font-bold text-lg">{fullname}</p>
            <p className="text-sm font-medium">{uid}</p>
          </div>
          <p className="font-medium text-sm overflow-x-auto whitespace-nowrap">
            {email}
          </p>
          <p className="text-blue-600 font-bold text-xl">₹ {balance}</p>
        </div>

        <hr className="border-gray-400 mb-2" />
        <form
          className="flex flex-col gap-2"
          onSubmit={handleBalanceSubmit(submitBalanceForm)}
        >
          <div className="flex flex-col">
            <label htmlFor="uid" className="text-gray-600  font-medium">
              UID
            </label>
            <input
              type="text"
              name="uid"
              id="uid"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-300"
              placeholder="Enter uid"
              {...balanceRegister("uid", { required: true })}
            />
            {balanceErrors.uid && (
              <span className="text-red-500 text-sm mt-1">
                UID likho tb khojna.
              </span>
            )}
            <label htmlFor="balance" className="text-gray-600 font-medium">
              Balance
            </label>
            <input
              type="text"
              name="balance"
              id="balance"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-300"
              placeholder="Enter balance"
              {...balanceRegister("balance", { required: true })}
            />
            {balanceErrors.balance && (
              <span className="text-red-500 text-sm mt-1">Balance batao.</span>
            )}
          </div>
          <button
            type="submit"
            className="hover:text-white transition-all bg-blue-400 duration-500 ease-in-out hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 mb-2 rounded p-1"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateData;
