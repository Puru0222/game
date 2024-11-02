import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import SlideButton from "react-slide-button";
import toast from "react-hot-toast";
import { useState } from "react";
import { apiConnector } from "../services/apiConnector";
import { bgmiendpoint } from "../services/apis";

const MyChallenge = () => {
  const joinChallenge = useSelector((state) => state.auth.joinChallenge);
  const createChallenge = useSelector((state) => state.auth.createChallenge);
  const challenges = useSelector((state) => state.challenge.challenges);
  const { id } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(joinChallenge);
    console.log(createChallenge);
  }, []);

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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Challenges</h2>

      {/* Display Created Challenges */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Created Challenges</h3>
        {createdChallenges.length > 0 ? (
          createdChallenges.map((challenge, index) => (
            <div key={index} className="p-4 border mb-2 rounded-md shadow">
              <p>
                <strong>Room ID:</strong> {challenge.roomId}
              </p>
              <p>
                <strong>Balance</strong> {challenge.balance}
              </p>
              <p>
                <strong>Players Count:</strong> {challenge.users.length}
              </p>
              <div className="flex justify-center">
                <strong>Players</strong>
              </div>
              <ul className="p-4 border mb-2 rounded-md shadow">
                {challenge.users.map((player) => (
                  <li key={player._id}>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={
                          selectedUsers[challenge._id]?.includes(player._id) ||
                          false
                        }
                        onChange={() =>
                          handleUserSelection(challenge._id, player._id)
                        }
                      />
                      <span className="ml-2">{player.fullname}</span>
                    </label>
                  </li>
                ))}
              </ul>
              {challenge.status === "completed" ? (
                <div className="flex justify-center text-white font-bold bg-gradient-to-r from-blue-500 to-blue-600">
                  Winner Selected
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
          <p>No created challenges.</p>
        )}
      </div>

      {/* Display Joined Challenges */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Joined Challenges</h3>
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
          <p>No joined challenges.</p>
        )}
      </div>
    </div>
  );
};

export default MyChallenge;
