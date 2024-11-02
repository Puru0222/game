import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SlideButton from "react-slide-button";
import toast from "react-hot-toast";
import { bgmiendpoint } from "../../services/apis";
import { apiConnector } from "../../services/apiConnector";

const Challenge = () => {
  const { uniqueSerialNumber } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { id, balance, uid } = useSelector((state) => state.auth);

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
    return <p className="text-center">Loading challenge data...</p>;
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
          toast.success("Welcome to another Challenge!");
        }
      }
    } catch (error) {
      console.error("Error updating Player:", error);
      toast.error("Insufficent Balance");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full bg-cover bg-center bg-gradient-to-r from-blue-500 to-purple-500 relative">
      <div className="bg-white bg-opacity-80 p-4 w-full max-w-80 sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-lg shadow-lg">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-extrabold text-gray-800">
            Accept Challenge
          </h1>
          <h2 className="text-xl font-semibold text-gray-700">
            {challenge.gname}
          </h2>
        </div>
        <div className="flex justify-between my-2 p-2 bg-gray-100 rounded-md">
          <p className="text-md text-gray-600">Room Id :</p>
          <p className="text-sm font-semibold text-gray-800">
            {challenge.roomId}
          </p>
        </div>
        <div className="flex justify-between my-2 p-2 bg-gray-100 rounded-md">
          <p className="text-md text-gray-600">Room Password:</p>
          <p className="text-sm font-semibold text-gray-800">
            {passwordVisible ? challenge.roomPassword : "******"}
          </p>
        </div>
        <div className="flex justify-between my-2 p-2 bg-gray-100 rounded-md">
          <p className="text-md text-gray-600">Entry Price:</p>
          <p className="text-sm font-semibold text-gray-800">
            {challenge.price}
          </p>
        </div>
        <div className="flex justify-between my-2 p-2 bg-gray-100 rounded-md">
          <p className="text-md text-gray-600">Map:</p>
          <p className="text-sm font-semibold text-gray-800">{challenge.map}</p>
        </div>
        <div className="flex justify-between my-2 p-2 bg-gray-100 rounded-md">
          <p className="text-md text-gray-600">Team Mode:</p>
          <p className="text-sm font-semibold text-gray-800">
            {challenge.teamMode}
          </p>
        </div>
        <div className="flex justify-between my-2 p-2 bg-gray-100 rounded-md">
          <p className="text-md text-gray-600">Note:</p>
          <p className="text-sm font-semibold text-gray-800">
            {challenge.note}
          </p>
        </div>
        <SlideButton
          mainText="Slide to Join"
          onSlideDone={() => {
            handleJoin();
            setPasswordVisible(true);
          }}
        />
      </div>
    </div>
  );
};

export default Challenge;
