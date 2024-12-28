import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SlideButton from "react-slide-button";
import toast from "react-hot-toast";
import { bgmiendpoint } from "../../services/apis";
import { apiConnector } from "../../services/apiConnector";
import img from "../../asset/challenge.webp";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaRegCopy } from "react-icons/fa6";
import { motion } from "framer-motion"; 


const Challenge = () => {
  const { uniqueSerialNumber } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { id, balance, uid } = useSelector((state) => state.auth);

  const handleCopy = () => {
    navigator.clipboard.writeText(challenge.roomId);
    toast.success("Room ID copied!");
  };

  const handleCopyPass = () => {
    navigator.clipboard.writeText(challenge.roomPassword);
    toast.success("Password copied!");
  };

  const storedChallenge = useSelector((state) =>
    state.challenge.challenges.find(
      (c) => c.uniqueSerialNumber === uniqueSerialNumber
    )
  );

  useEffect(() => {
    if (storedChallenge) {
      setChallenge(storedChallenge);
    }
  }, [storedChallenge, uniqueSerialNumber]);

  if (!challenge) {
    return <p className="text-center text-blue-600">Loading challenge data...</p>;
  }

  const handleJoin = async () => {
    const toastId = toast.loading("Loading...");
    const newBalance = balance - challenge.price;
    const price = challenge.price;

    const dataToSend = {
      id,
      uniqueSerialNumber,
      uid,
      newBalance,
      price,
    };
    try {
      const result = await apiConnector(
        "PUT",
        bgmiendpoint.UPDATE_PLAYER,
        dataToSend
      );
      if (!result.data.success) {
        toast.error(result.message);
      } else {
        if (result.data.message === "Already registered") {
          toast.success("Already registered");
        } else {
          setPasswordVisible(true);
          toast.success("Welcome to another Challenge!");
        }
      }
    } catch (error) {
      console.error("Error updating Player:", error);
      toast.error("Insufficient Balance");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center py-8"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${img})`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/45 p-6 w-full max-w-md mx-4 rounded-2xl shadow-2xl backdrop-blur-sm"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">
            Accept Challenge
          </h1>
          <h2 className="text-2xl font-semibold text-blue-600">
            {challenge.gname}
          </h2>
        </div>

        <div className="flex justify-between my-2 p-3 bg-gray-200 bg-opacity-90 rounded-md font-medium">
          <p className="text-blue-700 font-semibold">Room Password:</p>
          <div className="text-sm font-semibold text-blue-700">
            {passwordVisible ? (
              <div>
                {challenge.roomPassword}
                <CopyToClipboard onCopy={handleCopyPass}>
                  <button className="hover:text-white transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 mx-3 mb-1 bg-white rounded-full p-1">
                    <FaRegCopy className="flex text-base" />
                  </button>
                </CopyToClipboard>
              </div>
            ) : (
              "******"
            )}
          </div>
          </div>

        {/* Challenge Info Cards */}
        {[
          { label: "Room ID", value: challenge.roomId, copyFunction: handleCopy },
          { label: "Entry Price", value: challenge.price },
          { label: "Map", value: challenge.map },
          { label: "Team Mode", value: challenge.teamMode },
          { label: "Note", value: challenge.note },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-blue-50/75 rounded-lg p-3 mb-3 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <span className="text-blue-700 font-semibold">{item.label}</span>
              <div className="flex items-center">
                <span className="text-blue-900 font-medium">{item.value}</span>
                {item.copyFunction && (
                  <CopyToClipboard onCopy={item.copyFunction}>
                    <button className="ml-3 p-2 rounded-full hover:bg-blue-100 transition-colors duration-300">
                      <FaRegCopy className="text-blue-600 hover:text-blue-800" />
                    </button>
                  </CopyToClipboard>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Join Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <SlideButton
            mainText="Slide to Join Challenge"
            overlayText="→"
            className="w-full"
            containerClassName="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-full transition-all duration-300"
            onSlideDone={handleJoin}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Challenge;