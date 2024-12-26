import React, { useState } from "react";
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

  return (
    <div className="max-w-4xl bg-neutral-950 opacity-90 mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-10 text-white">
        <span className="bg-gradient-to-r from-purple-600 via-gray-500 to-pink-500 bg-clip-text text-transparent">
          Frequently Asked Questions
        </span>
      </h2>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl 
        transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg 
        hover:shadow-purple-500/10"
          >
            <div
              className="p-5 flex justify-between items-center cursor-pointer"
              onClick={() => toggleQuestion(index)}
            >
              <h3 className="text-xl font-medium text-gray-100 pr-8">
                {faq.question}
              </h3>
              <div className="flex-shrink-0">
                {openQuestion === index ? (
                  <FaChevronUp className="w-5 h-5 text-purple-400 transition-transform duration-300" />
                ) : (
                  <FaChevronDown className="w-5 h-5 text-purple-400 transition-transform duration-300" />
                )}
              </div>
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out
          ${
            openQuestion === index
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0"
          }`}
            >
              <p className="px-5 pb-5 text-gray-300 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
