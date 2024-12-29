import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useState } from "react";
import { apiConnector } from "../services/apiConnector";
import { bgmiendpoint } from "../services/apis";
import { fetchChallenges } from "../services/bgmiAPI";
import {
  MdDeleteSweep,
  MdGamepad,
  MdPerson,
  MdContentCopy,
} from "react-icons/md";

import {
  FaTrophy,
  FaUsers,
  FaCrown,
  FaUserSlash,
  FaUserCheck,
} from "react-icons/fa";
import {
  resetChallenges,
  saveChallenges,
} from "../slices/gameslices/challengeSlice";

const MyChallenge = () => {
  const dispatch = useDispatch();
  const joinChallenge = useSelector((state) => state.auth.joinChallenge);
  const createChallenge = useSelector((state) => state.auth.createChallenge);
  const challenges = useSelector((state) => state.challenge.challenges);
  const { id } = useSelector((state) => state.auth);

  const joinedChallenges = challenges.filter((challenge) =>
    joinChallenge.includes(challenge._id)
  );

  const createdChallenges = challenges.filter((challenge) =>
    createChallenge.includes(challenge._id)
  );

  const [selectedUsers, setSelectedUsers] = useState([]);
  const handleUserSelection = (challengeId, userId) => {
    setSelectedUsers((prevSelected) => {
      const currentSelection = prevSelected[challengeId] || [];
      const updatedSelection = currentSelection.includes(userId)
        ? currentSelection.filter((id) => id !== userId)
        : [...currentSelection, userId];

      return {
        ...prevSelected,
        [challengeId]: updatedSelection,
      };
    });
  };

  const handleJoin = async (balance, challengeId) => {
    const toastId = toast.loading("Loading...");

    const dataToSend = {
      balance,
      users: selectedUsers[challengeId] || [],
      challengeId,
      id,
    };
    try {
      const result = await apiConnector(
        "PUT",
        bgmiendpoint.SELECT_WINNER,
        dataToSend
      );
      if (!result.data.success) {
        toast.error("Select Winner");
      } else {
        toast.success("Winner Selected!");
        const updatedChallenges = await fetchChallenges();
        dispatch(resetChallenges());
        dispatch(saveChallenges(updatedChallenges));
      }
    } catch (error) {
      toast.error("No Winner Selected");
    } finally {
      toast.dismiss(toastId);
    }
  };

  // In MyChallenge.js

  const handleMarkStarted = async (challengeId) => {
    const toastId = toast.loading("Starting challenge...");

    try {
      const response = await apiConnector("PUT", bgmiendpoint.START_CHALLENGE, {
        challengeId,
      });
      if (response.data.success) {
        toast.success("Challenge marked as started!");
        // Update the challenge list to reflect the new status
        const updatedChallenges = await fetchChallenges();
        dispatch(resetChallenges());
        dispatch(saveChallenges(updatedChallenges));
      } else {
        toast.error(response.data.message || "Failed to start challenge");
      }
    } catch (error) {
      toast.error("An error occurred while starting the challenge.");
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleDeleteChallenge = async (challengeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this challenge? This action cannot be undone."
    );
    if (!confirmDelete) return;

    const toastId = toast.loading("Deleting challenge...");
    try {
      // API call to delete the challenge
      const response = await apiConnector(
        "DELETE",
        `${bgmiendpoint.DELETE_CHALLENGE}`,
        null,
        null,
        { challengeId }
      );

      if (response.data.success) {
        toast.success("Challenge deleted successfully!");
        // Update the challenge list after deletion
        const updatedChallenges = await fetchChallenges();
        dispatch(resetChallenges());
        dispatch(saveChallenges(updatedChallenges));
      } else {
        toast.error(response.data.message || "Failed to delete challenge.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the challenge.");
    } finally {
      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    const getChallenges = async () => {
      const challengesData = await fetchChallenges();
      dispatch(resetChallenges());
      dispatch(saveChallenges(challengesData));
    };

    if (id) {
      getChallenges();
    }
  }, [dispatch, id, joinChallenge, createChallenge]);

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gradient-to-b from-blue-900 via-indigo-900 to-black p-3">
      <div className="flex w-full max-w-6xl">
        <div className="w-full bg-white/5 flex flex-col backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/10">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 p-6">
            <h1 className="text-3xl font-bold text-white text-center flex items-center justify-center gap-3">
              <MdGamepad className="text-4xl text-blue-300" />
              My Challenges
            </h1>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Created Challenges Section */}
            <section className="mb-8">
              <h2 className="text-2xl justify-center font-bold text-white mb-4 flex items-center gap-3">
                <FaTrophy className="text-yellow-400" />
                Created Challenges
              </h2>

              <div className="grid gap-6">
                {createdChallenges.length > 0 ? (
                  createdChallenges.map((challenge) => (
                    <div
                      key={challenge._id}
                      className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur p-4 rounded-xl shadow-lg transition-all duration-300 hover:transform hover:scale-[1.02] border border-white/10"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-blue-300 font-medium">
                            Room ID:
                          </span>
                          <span className="bg-blue-600/80 px-4 py-1.5 rounded-full text-white font-medium">
                            {challenge.roomId}
                          </span>
                        </div>

                        {challenge.users.length === 0 && (
                          <button
                            onClick={() => handleDeleteChallenge(challenge._id)}
                            className="text-red-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-white/10"
                          >
                            <MdDeleteSweep size={26} />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-6 mb-4">
                        <div className="flex items-center gap-3 text-white bg-white/5 p-3 rounded-lg">
                          <FaUsers className="text-blue-400 text-xl" />
                          <span className="font-medium">
                            Players: {challenge.users.length}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-white bg-white/5 p-3 rounded-lg">
                          <FaTrophy className="text-yellow-400 text-xl" />
                          <span className="font-medium">
                            Pool: ₹{challenge.balance}
                          </span>
                        </div>
                      </div>

                      {/* Players Selection */}
                      {challenge.status !== "completed" && (
                        <div className="bg-white/5 rounded-xl p-4 mb-4">
                          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                            <FaUserCheck className="text-green-400" />
                            Select Winners
                          </h3>
                          <div className="space-y-2">
                            {challenge.users.map((player) => (
                              <label
                                key={player._id}
                                className="flex items-center gap-3 text-white hover:bg-white/10 p-3 rounded-lg cursor-pointer transition-colors"
                              >
                                <input
                                  type="checkbox"
                                  className="w-5 h-5 accent-blue-500 rounded"
                                  checked={
                                    selectedUsers[challenge._id]?.includes(
                                      player._id
                                    ) || false
                                  }
                                  onChange={() =>
                                    handleUserSelection(
                                      challenge._id,
                                      player._id
                                    )
                                  }
                                />
                                <MdPerson className="text-blue-300" />
                                <span className="font-medium">
                                  {player.fullname}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="text-white font-bold text-lg mb-4 p-3 bg-white/5 rounded-lg">
                        Winner gets: ₹{(challenge.balance * 0.8).toFixed(2)}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-center gap-4">
                        {challenge.status === "started" ? (
                          <p className="text-red-400 py-2 font-semibold">
                            Challenge has started
                          </p>
                        ) : challenge.status === "completed" ? (
                          <p className="text-green-400 font-semibold">
                            Challenge completed
                          </p>
                        ) : (
                          <button
                            onClick={() => handleMarkStarted(challenge._id)}
                            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium"
                          >
                            Start Challenge
                          </button>
                        )}

                        {challenge.status !== "completed" && (
                          <button
                            onClick={() =>
                              handleJoin(challenge.balance, challenge._id)
                            }
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                          >
                            Select Winner
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-white text-center py-12 bg-white/5 rounded-xl">
                    <div className="flex flex-col items-center gap-4">
                      <FaUserSlash className="text-4xl text-blue-300" />
                      <span className="text-lg">No created challenges yet</span>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Joined Challenges Section */}
            <section>
              <h2 className="text-2xl justify-center font-bold text-white mb-4 flex items-center gap-3">
                <FaUsers className="text-green-400" />
                Joined Challenges
              </h2>

              <div className="grid gap-6">
                {joinedChallenges.length > 0 ? (
                  joinedChallenges.map((challenge) => (
                    <div
                      key={challenge._id}
                      className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur p-4 rounded-xl shadow-lg transition-all duration-300 hover:transform hover:scale-[1.02] border border-white/10"
                    >
                      {/* Challenge Header */}
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                          <MdPerson className="text-blue-300 text-xl" />
                          <span className="text-white font-medium">
                            {challenge.fullname}
                          </span>
                        </div>
                        <div className="bg-blue-600/20 px-4 py-1.5 rounded-full">
                          <span className="text-blue-300 font-medium">
                            {challenge.map}
                          </span>
                        </div>
                      </div>

                      {/* Room Details */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-white/5 p-3 rounded-lg">
                          <div className="flex flex-col gap-2">
                            <span className="text-blue-300 text-sm font-medium">
                              Room ID
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="bg-blue-600/80 px-2 py-1.5 rounded-lg text-white font-medium">
                                {challenge.roomId}
                              </span>
                              <button
                                className="text-blue-300 hover:text-blue-400 transition-colors"
                                onClick={() =>
                                  navigator.clipboard.writeText(
                                    challenge.roomId
                                  )
                                }
                              >
                                <MdContentCopy />
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white/5 p-4 rounded-lg">
                          <div className="flex flex-col gap-2">
                            <span className="text-blue-300 text-sm font-medium">
                              Room Password
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="bg-blue-600/80 px-2 py-1.5 rounded-lg text-white font-medium">
                                {challenge.roomPassword}
                              </span>
                              <button
                                className="text-blue-300 hover:text-blue-400 transition-colors"
                                onClick={() =>
                                  navigator.clipboard.writeText(
                                    challenge.roomPassword
                                  )
                                }
                              >
                                <MdContentCopy />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Winners Section */}
                      {challenge.winners && challenge.winners.length > 0 && (
                        <div className="mt-4">
                          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                            <FaTrophy className="text-yellow-400" />
                            Winners
                          </h3>
                          <div className="bg-white/5 rounded-lg p-4 space-y-2">
                            {challenge.winners.map((winner) => (
                              <div
                                key={winner._id}
                                className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg transition-colors"
                              >
                                <FaCrown className="text-yellow-400" />
                                <span className="text-white font-medium">
                                  {winner.fullname}
                                </span>
                                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm ml-auto">
                                  Winner
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Challenge Status */}
                      <div className="mt-4 flex justify-center">
                        <span className="bg-blue-500/20 text-blue-300 px-6 py-2 rounded-full font-medium">
                          {challenge.status === "completed"
                            ? "Challenge Completed"
                            : "Challenge In Progress"}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-white text-center py-12 bg-white/5 rounded-xl">
                    <div className="flex flex-col items-center gap-4">
                      <FaUserSlash className="text-4xl text-blue-300" />
                      <span className="text-lg">No joined challenges yet</span>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyChallenge;
