import React, { useState } from "react";
import { useForm } from "react-hook-form";
import img from "../../../asset/pb1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBgmiChallange } from "../../../services/bgmiAPI";
import { motion, AnimatePresence } from "framer-motion";

// Animation Variants
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

const buttonVariants = {
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.95,
  },
};

const inputVariants = {
  focus: {
    scale: 1.02,
    borderColor: "#4f46e5",
    transition: {
      duration: 0.2,
    },
  },
};

// Animated Form Field Component
const AnimatedFormField = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        type: "spring",
        stiffness: 100,
      }}
    >
      {children}
    </motion.div>
  );
};

// Loading Animation Component
const LoadingAnimation = () => {
  return (
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="w-16 h-16 border-4 border-indigo-500 rounded-full border-t-transparent"
    />
  );
};

// Success Animation Component
const SuccessAnimation = () => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 10,
      }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
        }}
        className="bg-green-500 text-white p-6 rounded-lg"
      >
        Challenge Created Successfully!
      </motion.div>
    </motion.div>
  );
};

const BgmiChallange = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const gname = "BGMI";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fullname, uid } = useSelector((state) => state.auth);

  const generateSerialNumber = () => {
    const specificDate = new Date();
    const year = 1;
    const month = String(specificDate.getMonth() + 1).padStart(2, "0");
    const day = String(specificDate.getDate()).padStart(2, "0");
    const hour = String(specificDate.getHours()).padStart(2, "0");
    const minute = String(specificDate.getMinutes()).padStart(2, "0");
    const second = String(specificDate.getSeconds()).padStart(2, "0");
    // const millisecond = String(specificDate.getMilliseconds()).padStart(3, "0");
    return `${year}${month}${day}${hour}${minute}${second}`;
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const uniqueSerialNumber = generateSerialNumber();
      await dispatch(
        createBgmiChallange(
          uid,
          data.roomId,
          data.roomPassword,
          data.teamMode,
          data.map,
          data.price,
          fullname,
          uniqueSerialNumber,
          gname,
          data.note,
          navigate
        )
      );
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        navigate("/dashboard/join");
      }, 2000);
    } catch (error) {
      console.error("Error Creating BGMI challange:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${img})`,
        backgroundAttachment: "fixed",
      }}
    >
      <AnimatePresence>
        {isSuccess && <SuccessAnimation />}
      </AnimatePresence>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-gray-900/90 to-black/90 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-800"></div>

        <div className="relative p-8 sm:p-10">
          <motion.div variants={itemVariants} className="text-center mb-8">
            <motion.h1
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-indigo-500 mb-2"
            >
              BGMI Challenge
            </motion.h1>
            <motion.p variants={itemVariants} className="text-gray-400">
              Create your custom battleground
            </motion.p>
          </motion.div>

          <motion.form
            variants={containerVariants}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <AnimatedFormField delay={0.1}>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Room ID
                </label>
                <motion.input
                  variants={inputVariants}
                  whileFocus="focus"
                  className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800/50 text-yellow-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter Room ID"
                  {...register("roomId", { required: "Room ID is required" })}
                />
                {errors.roomId && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1 text-red-400 text-sm"
                  >
                    {errors.roomId.message}
                  </motion.p>
                )}
              </AnimatedFormField>

              <AnimatedFormField delay={0.2}>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Room Password
                </label>
                <motion.input
                  variants={inputVariants}
                  whileFocus="focus"
                  className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800/50 text-yellow-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  type="password"
                  placeholder="Enter Password"
                  {...register("roomPassword", {
                    required: "Room Password is required",
                  })}
                />
                {errors.roomPassword && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1 text-red-400 text-sm"
                  >
                    {errors.roomPassword.message}
                  </motion.p>
                )}
              </AnimatedFormField>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <AnimatedFormField delay={0.3}>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Team Mode
                </label>
                <motion.select
                  variants={inputVariants}
                  whileFocus="focus"
                  className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800/50 text-yellow-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  {...register("teamMode", { required: "Team Mode is required" })}
                >
                  <option value="solo">Solo</option>
                  <option value="duo">Duo</option>
                  <option value="squad">Squad</option>
                  <option value="6v6">6v6</option>
                </motion.select>
                {errors.teamMode && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1 text-red-400 text-sm"
                  >
                    {errors.teamMode.message}
                  </motion.p>
                )}
              </AnimatedFormField>

              <AnimatedFormField delay={0.4}>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Map
                </label>
                <motion.select
                  variants={inputVariants}
                  whileFocus="focus"
                  className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800/50 text-yellow-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  {...register("map", { required: "Map is required" })}
                >
                  <option value="">Select Map</option>
                  <option value="Team Deathmatch">Team Deathmatch</option>
                  <option value="Erangel">Erangel</option>
                  <option value="Miramar">Miramar</option>
                  <option value="Sanhok">Sanhok</option>
                  <option value="Livik">Livik</option>
                  <option value="Vikendi">Vikendi</option>
                  <option value="Gun Game">Gun Game</option>
                  <option value="Arcade">Arcade</option>
                </motion.select>
                {errors.map && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1 text-red-400 text-sm"
                  >
                    {errors.map.message}
                  </motion.p>
                )}
              </AnimatedFormField>
            </motion.div>

            <AnimatedFormField delay={0.5}>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Entry Price
              </label>
              <motion.input
                variants={inputVariants}
                whileFocus="focus"
                className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800/50 text-yellow-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                type="text"
                placeholder="Enter entry price"
                {...register("price", {
                  required: "Room entry price is required",
                  pattern: {
                    value: /^\d+$/,
                    message: "Entry Price must be a number",
                  },
                })}
              />
              {errors.price && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 text-red-400 text-sm"
                >
                  {errors.price.message}
                </motion.p>
              )}
            </AnimatedFormField>

            <AnimatedFormField delay={0.6}>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Note
              </label>
              <motion.textarea
                variants={inputVariants}
                whileFocus="focus"
                className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800/50 text-yellow-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                placeholder="Add any additional notes"
                rows="3"
                {...register("note")}
              />
            </AnimatedFormField>

            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50"
              type="submit"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <LoadingAnimation />
                  <span className="ml-2">Creating Challenge...</span>
                </div>
              ) : (
                "Create Challenge"
              )}
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BgmiChallange;