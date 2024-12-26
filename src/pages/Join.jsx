import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  resetChallenges,
  saveChallenges,
} from "../slices/gameslices/challengeSlice";
import { useSelector } from "react-redux";
import { fetchChallenges } from "../services/bgmiAPI";

function Join() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { challenges } = useSelector((state) => state.challenge);

  useEffect(() => {
    const loadChallenges = async () => {
      setLoading(true);
      try {
        const challengesData = await fetchChallenges();
        dispatch(resetChallenges());
        dispatch(saveChallenges(challengesData));
      } catch (error) {
        console.error("Failed to load challenges:", error);
      } finally {
        setLoading(false);
      }
    };
    loadChallenges();
  }, [dispatch]);

  const onClickHandle = (uniqueSerialNumber) => {
    navigate(`/challenge/${uniqueSerialNumber}`);
  };

  return (
    <div className="flex flex-col gap-6 p-1 mt-1">
      {loading ? (
        <div className="flex justify-center items-center bg-black bg-opacity-70 rounded-lg shadow-md p-6">
          <p className="text-center text-gray-50 text-lg font-semibold">
            Loading .....
          </p>
        </div>
      ) : challenges.length > 0 ? (
        challenges.map((challenge) => (
          <div
            key={challenge.uniqueSerialNumber}
            className="bg-blue-900 w-full bg-opacity-70 p-4 rounded-lg border border-blue-500  shadow-[0_0_10px_2px_rgba(59,130,246,0.8)] transition-shadow duration-300"
            >
            <div className="text-xl flex justify-evenly mb-2 font-bold text-white">
              <div>{challenge.gname}</div>
              <div>{challenge.fullname}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm text-gray-100 font-medium">
                Team Mode: {challenge.teamMode}
              </div>
              <div className="text-sm text-gray-100 font-medium">
                Map: {challenge.map}
              </div>
            </div>
            <div className="flex justify-between mb-1">
              <div className="text-sm text-gray-100 font-medium">
                Players: {challenge.players}
              </div>
              <div className="text-sm text-gray-100 font-medium">
                Entry Price: {challenge.price}
              </div>
            </div>
            {challenge.note && (
              <div className="text-gray-100 font-medium">
                Note: {challenge.note}
              </div>
            )}
            {challenge.status === "started" ? (
              <p className="text-center text-red-500 font-semibold mt-4">
                Challenge has started.
              </p>
            ) : challenge.status === "completed" ? (
              <p className="text-center text-green-500 font-semibold mt-4">
                Challenge has been completed.
              </p>
            ) : (
              <button
                className="flex w-full mt-2 bg-blue-700 bg-opacity-80 border border-blue-500 justify-center gap-x-2 text-gray-50 hover:text-white p-2 rounded-md transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600"
                onClick={() => onClickHandle(challenge.uniqueSerialNumber)}
              >
                View Challenge
              </button>
            )}
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center bg-black bg-opacity-70 rounded-lg shadow-md p-6">
          <p className="text-center text-gray-50 text-lg font-semibold">
            No challenges available.
          </p>
        </div>
      )}
    </div>
  );
}

export default Join;
