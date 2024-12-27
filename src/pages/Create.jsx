import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Add framer-motion
import { FaGamepad, FaFire, FaCrosshairs } from "react-icons/fa"; // Add icons

const Create = () => {
  const games = [
    {
      to: "/bgmichallange",
      title: "BGMI",
      icon: <FaGamepad className="mr-3 text-2xl" />,
      gradient: "from-blue-400 to-blue-600",
    },
    {
      to: "/ffchallange",
      title: "FreeFire",
      icon: <FaFire className="mr-3 text-2xl" />,
      gradient: "from-orange-400 to-red-600",
    },
    {
      to: "/codchallange",
      title: "Call Of Duty",
      icon: <FaCrosshairs className="mr-3 text-2xl" />,
      gradient: "from-purple-400 to-purple-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-black/80 backdrop-blur-lg p-8 sm:p-12 rounded-2xl shadow-2xl border border-gray-800"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl text-center mb-12 sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-500 to-purple-600"
        >
          Create Challenge
        </motion.h1>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {games.map((game, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={game.to}
                className={`group relative w-full flex items-center justify-center px-8 py-5 rounded-xl bg-gradient-to-r ${game.gradient} transform transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25`}
              >
                <div className="absolute inset-0 bg-black/50 rounded-xl group-hover:bg-black/40 transition-all duration-300" />
                <div className="relative flex items-center text-white text-2xl font-bold">
                  {game.icon}
                  {game.title}
                </div>
                <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  →
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Optional: Add a decorative element */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          Select a game to create your challenge
        </div>
      </motion.div>
    </div>
  );
};

export default Create;