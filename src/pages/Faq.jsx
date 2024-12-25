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
    <div className="max-w-3xl z-20 mb-12 text-white mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 transition-shadow hover:shadow-md"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleQuestion(index)}
            >
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              {openQuestion === index ? (
                <FaChevronUp className="text-gray-500" />
              ) : (
                <FaChevronDown className="text-gray-500" />
              )}
            </div>
            {openQuestion === index && (
              <p className="mt-2 text-gray-600 transition-opacity duration-300">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
