import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const faqs = [
    {
      question: "How to login?",
      answer:
        "For login, you have to first create your account by signing up, entering your game name, game UID, email, and password, then log in.",
    },
    {
      question: "How to join a challenge?",
      answer:
        "If the challenges are visible on the dashboard page and the entry fee is present in your wallet, then you can join.",
    },
    {
      question: "How to create a challenge?",
      answer:
        "To create a challenge, first select your game (PUBG, FreeFire, or Call of Duty), then fill in the room ID and room password, set the entry fee, and confirm it.",
    },
    {
      question: "How to delete a challenge?",
      answer:
        "First, go to the My Challenges section, then click on the delete button, and press OK on the popup.",
    },
    {
      question: "How to withdraw money?",
      answer:
        "Go to your profile, click on the withdrawal button, enter the amount present in your wallet, and send it. Money will be deposited within 1 hour.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="bg-neutral-950 opacity-90 mx-auto p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2
        className="text-3xl font-bold text-center mb-10 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="bg-gradient-to-r from-blue-600 via-gray-300 to-blue-700 bg-clip-text text-transparent">
          Frequently Asked Questions
        </span>
      </motion.h2>

      <motion.div className="space-y-6" variants={containerVariants}>
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl 
            transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg 
            hover:shadow-blue-500/10"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="p-5 flex justify-between items-center cursor-pointer"
              onClick={() => toggleQuestion(index)}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="text-xl font-medium text-gray-100 pr-8">
                {faq.question}
              </h3>
              <motion.div
                animate={{ rotate: openQuestion === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {openQuestion === index ? (
                  <FaChevronUp className="w-5 h-5 text-blue-600" />
                ) : (
                  <FaChevronDown className="w-5 h-5 text-blue-600" />
                )}
              </motion.div>
            </motion.div>

            <AnimatePresence>
              {openQuestion === index && (
                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="overflow-hidden"
                >
                  <motion.p
                    className="px-5 pb-5 text-gray-300 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {faq.answer}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default FAQ;