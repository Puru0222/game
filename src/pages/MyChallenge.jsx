import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SlideButton from "react-slide-button";
import toast from "react-hot-toast";
import { useState } from "react";
import { apiConnector } from "../services/apiConnector";
import { bgmiendpoint } from "../services/apis";
import img from "../asset/mychallenge.webp";
import { fetchChallenges } from "../services/bgmiAPI";
import { MdDeleteSweep } from "react-icons/md";
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
    <div
      className="flex justify-center items-center h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="bg-white bg-opacity-80 p-4 w-full max-w-80 sm:max-w-lg md:max-w-xl lg:max-w-2xl flex-1 rounded-lg shadow-lg overflow-hidden">
        {/* Fixed Header */}
        <div className="flex justify-center text-white items-center p-2 mb-3 rounded-lg shadow-lg bg-blue-500 font-bold text-2xl ">
          <div className="animate-breathe">My Challenges</div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[75vh] pr-2">
          {/* Display Created Challenges */}
          <div className="mb-6 ">
            <h3 className="text-xl text-blue-800 flex items-center p-2 mb-3 rounded-lg shadow-lg font-medium ">
              Created Challenges
            </h3>
            {createdChallenges.length > 0 ? (
              createdChallenges.map((challenge, index) => (
                <div
                  key={index}
                  className="p-4 mb-4 border rounded-lg shadow-lg"
                >
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium">
                      <strong>Room ID:</strong> {challenge.roomId}
                    </h3>
                    {challenge.users.length === 0 && (
                      <button
                        onClick={() => handleDeleteChallenge(challenge._id)}
                        className="text-red-700 mr-5 mb-2"
                        title="Delete Challenge"
                      >
                        <MdDeleteSweep size={24} />
                      </button>
                    )}
                  </div>
                  <div className="text-lg flex justify-between">
                    <div>
                      <strong>Pool:</strong> {challenge.balance}
                    </div>
                    {challenge.status === "started" ? (
                      <p className="text-center text-red-500 font-semibold">
                        Challenge has started.
                      </p>
                    ) : challenge.status === "completed" ? (
                      <p className="text-center text-green-500 font-semibold">
                        Challenge has been completed.
                      </p>
                    ) : (
                      <button
                        onClick={() => handleMarkStarted(challenge._id)}
                        className="text-white bg-blue-500 rounded px-2 hover:text-gray-100"
                      >
                        Mark Started
                      </button>
                    )}
                  </div>
                  <p className="text-lg">
                    <strong>Players Count:</strong> {challenge.users.length}
                  </p>
                  <div className="flex justify-center mb-2">
                    <div className="text-lg font-semibold">Players</div>
                  </div>

                  {/* Conditionally render player selection if challenge is not completed */}
                  {challenge.status !== "completed" ? (
                    <ul className="p-4 mb-2 border rounded-md shadow-lg">
                      {challenge.users.map((player) => (
                        <li
                          key={player._id}
                          className="flex items-center p-2 hover:bg-gray-100 rounded transition-colors duration-200"
                        >
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            checked={
                              selectedUsers[challenge._id]?.includes(
                                player._id
                              ) || false
                            }
                            onChange={() =>
                              handleUserSelection(challenge._id, player._id)
                            }
                          />
                          <span className="ml-2">{player.fullname}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex justify-center items-center p-4 rounded-lg shadow-lg bg-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-lg">Winner Selected!</span>
                    </div>
                  )}

                  {/* Conditionally render the winner selection button if challenge is not completed */}
                  {challenge.status !== "completed" && (
                    <SlideButton
                      mainText="Select Winner"
                      onSlideDone={() =>
                        handleJoin(challenge.balance, challenge._id)
                      }
                    />
                  )}
                </div>
              ))
            ) : (
              <p className="text-lg flex justify-center items-center p-2 mb-3 rounded-lg shadow-lg font-normal">
                No created challenges.
              </p>
            )}
          </div>
          <hr className="border-gray-900 border mb-4" />

          {/* Display Joined Challenges */}
          <div>
            <h3 className="text-xl text-blue-800 flex items-center p-2 mb-3 rounded-lg shadow-lg  font-medium ">
              Joined Challenges
            </h3>
            {joinedChallenges.length > 0 ? (
              joinedChallenges.map((challenge, index) => (
                <div key={index} className="p-4 border mb-2 rounded-md shadow">
                  <div className="flex justify-between">
                    <p>
                      <strong>Room ID:</strong> {challenge.roomId}
                    </p>
                    <p>
                      <strong>{challenge.fullname}</strong>
                    </p>
                  </div>
                  <p>
                    <strong>Room Password:</strong> {challenge.roomPassword}
                  </p>
                  <p>
                    <strong>Map:</strong> {challenge.map}
                  </p>
                  {challenge.winners && challenge.winners.length > 0 ? (
                    <div className="mt-3">
                      <p>
                        <strong>Winners:</strong>
                      </p>
                      <ul className="list-disc pl-5">
                        {challenge.winners.map((winner, idx) => (
                          <li key={idx}>{winner.fullname}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="mt-3 text-gray-800">
                      No winners selected yet.
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-lg flex justify-center items-center p-2 mb-3 rounded-lg shadow-lg font-normal">
                No joined challenges.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyChallenge;
