import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import certificate from "../asset/Udyam Registration Certificate.jpg";
import { FaCertificate } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Terms"];

const Footer = () => {
  const [showQRCode, setShowQRCode] = useState(false);

  // Animation variants
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 300,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      y: -100,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      y: 100,
      transition: {
        duration: 0.2,
      },
    },
  };

  // QR Code popup component
  const QRCodePopup = () => (
    <AnimatePresence>
      {showQRCode && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={() => setShowQRCode(false)}
        >
          <motion.div
            className="bg-white p-8 rounded-xl shadow-2xl relative max-w-md w-full mx-4"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowQRCode(false)}
            >
              ✕
            </motion.button>
            <motion.img
              src={certificate}
              alt="QR Code"
              className="w-full rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <motion.footer
      className="bg-gradient-to-b from-black to-gray-900 text-gray-200 border-t-4 border-orange-400"
      variants={footerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-8">
          {/* Left Section */}
          <motion.nav
            className="flex space-x-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {BottomFooter.map((ele, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={ele.split(" ").join("-").toLocaleLowerCase()}
                  className="hover:text-orange-400 transition-colors duration-300"
                >
                  {ele}
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          {/* Certificate Button */}
          <motion.button
            onClick={() => setShowQRCode(true)}
            className="flex items-center gap-2 px-6 py-3 bg-orange-400 text-white rounded-lg shadow-lg"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <FaCertificate className="text-xl" />
            <span>View Certificate</span>
          </motion.button>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="flex flex-col lg:flex-row justify-between items-center pt-6 border-t border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className="flex items-center gap-2 mb-4 lg:mb-0"
            whileHover={{ scale: 1.02 }}
          >
            Made with
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className="text-red-500 text-xl"
            >
              ❤️
            </motion.span>
            by
            <motion.a
              // href="https://your-portfolio-link.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 font-bold"
              whileHover={{ scale: 1.05, color: "#f97316" }}
            >
              Puru
            </motion.a>
          </motion.div>

          <motion.div
            className="text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            © {new Date().getFullYear()} Game Challenger
          </motion.div>
        </motion.div>
      </div>

      <QRCodePopup />
    </motion.footer>
  );
};

export default Footer;