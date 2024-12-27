import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SlideButton from "react-slide-button";
import toast from "react-hot-toast";
import { useState } from "react";
import { apiConnector } from "../services/apiConnector";
import { bgmiendpoint } from "../services/apis";
import img from "../asset/mychallenge.webp";
import { fetchChallenges } from "../services/bgmiAPI";
import { MdDeleteSweep, MdGamepad, MdPerson } from "react-icons/md";
import { FaTrophy, FaUsers, FaMapMarkedAlt } from "react-icons/fa";
import { BiKey } from "react-icons/bi";
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
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
            <h1 className="text-2xl font-bold text-white text-center flex items-center justify-center gap-2">
              <MdGamepad className="text-3xl" />
              My Challenges
            </h1>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Created Challenges Section */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FaTrophy className="text-yellow-400" />
                Created Challenges
              </h2>

              <div className="space-y-4">
                {createdChallenges.length > 0 ? (
                  createdChallenges.map((challenge) => (
                    <div
                      key={challenge._id}
                      className="bg-white/20 backdrop-blur p-6 rounded-lg shadow-lg transition-all hover:transform hover:scale-[1.01]"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold">
                            Room ID:
                          </span>
                          <span className="bg-blue-600 px-3 py-1 rounded text-white">
                            {challenge.roomId}
                          </span>
                        </div>

                        {challenge.users.length === 0 && (
                          <button
                            onClick={() => handleDeleteChallenge(challenge._id)}
                            className="text-red-400 hover:text-red-600 transition-colors"
                          >
                            <MdDeleteSweep size={24} />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-white">
                          <FaUsers className="text-blue-400" />
                          <span>Players: {challenge.users.length}</span>
                        </div>

                        <div className="flex items-center gap-2 text-white">
                          <FaTrophy className="text-yellow-400" />
                          <span>Pool: ₹{challenge.balance}</span>
                        </div>
                      </div>

                      {/* Players Selection */}
                      {challenge.status !== "completed" && (
                        <div className="bg-white/10 rounded-lg p-4 mb-4">
                          <h3 className="text-white font-semibold mb-2">
                            Select Winners
                          </h3>
                          <div className="space-y-2">
                            {challenge.users.map((player) => (
                              <label
                                key={player._id}
                                className="flex items-center gap-2 text-white hover:bg-white/10 p-2 rounded cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  className="w-4 h-4 accent-blue-500"
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
                                <MdPerson />
                                <span>{player.fullname}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex justify-center gap-4">
                        {challenge.status === "started" ? (
                          <p className="text-center text-red-500 pt-2 font-semibold">
                            Challenge has started.
                          </p>
                        ) : challenge.status === "completed" ? (
                          <p className="text-center text-green-500 font-semibold">
                            Challenge has been completed.
                          </p>
                        ) : (
                          <button
                            onClick={() => handleMarkStarted(challenge._id)}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                          >
                            Start Challenge
                          </button>
                        )}

                        {challenge.status !== "completed" && (
                          <button
                            onClick={() =>
                              handleJoin(challenge.balance, challenge._id)
                            }
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            Select Winner
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-white text-center py-8">
                    No created challenges yet
                  </div>
                )}
              </div>
            </section>

            {/* Joined Challenges Section */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FaUsers className="text-green-400" />
                Joined Challenges
              </h2>

              <div className="space-y-4">
                {joinedChallenges.length > 0 ? (
                  joinedChallenges.map((challenge) => (
                    <div
                      key={challenge._id}
                      className="bg-white/20 backdrop-blur p-6 rounded-lg shadow-lg"
                    >
                      <div className="flex justify-between text-white">
                        <span>{challenge.fullname}</span>
                        <div className="flex gap-2 items-center">
                          <FaMapMarkedAlt className="text-green-400" />
                          <span>{challenge.map}</span>
                        </div>
                      </div>
                      <div className="flex mt-2 justify-between gap-6 text-white">
                        <div className="flex gap-2 items-center">
                          <BiKey className="text-yellow-400" />
                          <strong>
                            ID:{" "}
                            <span className="bg-blue-600 px-3 py-1 rounded text-white">
                              {challenge.roomId}
                            </span>
                          </strong>
                        </div>
                        <div>
                          <strong>Password:</strong>{" "}
                          <span className="bg-blue-600 px-3 py-1 rounded text-white">
                            {challenge.roomPassword}
                          </span>
                        </div>
                      </div>

                      {/* Challenge Details */}

                      {challenge.winners && challenge.winners.length > 0 && (
                        <div className="mt-2">
                          <h3 className="text-white font-semibold mb-2">
                            Winners
                          </h3>
                          <div className="bg-white/10 rounded-lg p-4">
                            {challenge.winners.map((winner) => (
                              <div
                                key={winner._id}
                                className="flex items-center gap-2 text-white"
                              >
                                <FaTrophy className="text-yellow-400" />
                                <span>{winner.fullname}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-white text-center py-8">
                    No joined challenges yet
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
