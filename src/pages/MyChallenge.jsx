import React from "react";
import { useSelector } from "react-redux";
import SlideButton from "react-slide-button";
import toast from "react-hot-toast";
import { useState } from "react";
import { apiConnector } from "../services/apiConnector";
import { bgmiendpoint } from "../services/apis";
import img from "../asset/mychallenge.webp";

const MyChallenge = () => {
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
      }
    } catch (error) {
      toast.error("No Winner Selected");
    } finally {
      toast.dismiss(toastId);
    }
  };
  return (
    <div
      className="flex justify-center items-center h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="bg-white bg-opacity-80 p-4 w-full max-w-80 sm:max-w-lg md:max-w-xl lg:max-w-2xl flex-1 rounded-lg shadow-lg overflow-hidden">
        {/* Fixed Header */}
        <div className="flex justify-center items-center p-2 mb-3 rounded-lg shadow-lg bg-blue-500 font-bold text-2xl ">
          <div className="animate-breathe">My Challenges</div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[75vh] pr-2">
          {/* Display Created Challenges */}
          <div className="mb-6 ">
            <h3 className="text-xl flex justify-center items-center p-2 mb-3 rounded-lg shadow-lg bg-opacity-60 bg-gray-300 font-medium ">
              Created Challenges
            </h3>
            {createdChallenges.length > 0 ? (
              createdChallenges.map((challenge, index) => (
                <div
                  key={index}
                  className="p-4 mb-4 border rounded-lg shadow-lg"
                >
                  <h3 className="text-lg font-medium">
                    <strong>Room ID:</strong> {challenge.roomId}
                  </h3>
                  <p className="text-lg">
                    <strong>Pool:</strong> {challenge.balance}
                  </p>
                  <p className="text-lg">
                    <strong>Players Count:</strong> {challenge.users.length}
                  </p>
                  <div className="flex justify-center mb-2">
                    <div className="text-lg font-semibold">Players</div>
                  </div>
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
                  {challenge.status === "completed" ? (
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
                  ) : (
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
            <h3 className="text-xl flex justify-center items-center p-2 mb-3 rounded-lg shadow-lg bg-gray-300 bg-opacity-60 font-medium ">
              Joined Challenges
            </h3>
            {joinedChallenges.length > 0 ? (
              joinedChallenges.map((challenge, index) => (
                <div key={index} className="p-4 border mb-2 rounded-md shadow">
                  <p>
                    <strong>Room ID:</strong> {challenge.roomId}
                  </p>
                  <p>
                    <strong>Map:</strong> {challenge.map}
                  </p>
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
