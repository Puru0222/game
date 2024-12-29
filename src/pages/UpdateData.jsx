import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateBalance } from "../services/dataUpdateAPI";
import { motion } from "framer-motion";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-3"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6"
      >
        <motion.h1
          variants={itemVariants}
          className="text-3xl font-bold mb-4 text-center text-gray-800"
        >
          Search For UID
        </motion.h1>

        {/* Search Form */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleUidSubmit(submitUidForm)}
          className="space-y-4 mb-2"
        >
          <div className="space-y-2">
            <label className="text-gray-700 font-semibold block">UID</label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              className="w-full px-2 py-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="Enter UID"
              {...uidRegister("uid", { required: true })}
            />
            {uidErrors.uid && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm"
              >
                Please enter a UID
              </motion.span>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
            type="submit"
          >
            Search
          </motion.button>
        </motion.form>

        <motion.div
          variants={itemVariants}
          className="border-t border-gray-200 my-2"
        />

        {/* User Info Card */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-50 p-4 rounded-xl shadow-lg mb-4"
        >
          <div className="flex justify-between items-center mb-2">
            <motion.p
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="font-bold text-xl text-gray-800"
            >
              {fullname}
            </motion.p>
            <motion.p
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-gray-600 font-medium"
            >
              {uid}
            </motion.p>
          </div>
          <motion.p className="text-gray-600 font-medium mb-2">
            {email}
          </motion.p>
          <motion.p
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-2xl font-bold text-blue-600"
          >
            ₹ {balance}
          </motion.p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="border-t border-gray-200 my-6"
        />

        {/* Update Balance Form */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleBalanceSubmit(submitBalanceForm)}
          className="space-y-4"
        >
          <div className="space-y-4">
            <div>
              <label className="text-gray-700 font-semibold block mb-2">
                UID
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter UID"
                {...balanceRegister("uid", { required: true })}
              />
              {balanceErrors.uid && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm"
                >
                  Please enter a UID
                </motion.span>
              )}
            </div>

            <div>
              <label className="text-gray-700 font-semibold block">
                Balance
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter balance"
                {...balanceRegister("balance", { required: true })}
              />
              {balanceErrors.balance && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm"
                >
                  Please enter balance amount
                </motion.span>
              )}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
            type="submit"
          >
            Update Balance
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default UpdateData;
