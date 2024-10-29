import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { apiConnector } from "../services/apiConnector";
import { bgmiendpoint } from "../services/apis";
import { saveChallenges } from "../slices/gameslices/challengeSlice";
import { useSelector } from "react-redux";

function Join() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChallenges = async () => {
      setLoading(true);
      try {
        const response = await apiConnector("GET", bgmiendpoint.GET_CHALLANGES);
        if (response.data.challenges && response.data.challenges.length > 0) {
          dispatch(saveChallenges(response.data.challenges));
        }
      } catch (error) {
        console.error("Failed to fetch challenges:", error);
      }
      setLoading(false);
    };
    fetchChallenges();
  }, [dispatch]);

  const { challenges } = useSelector((state) => state.challenge);

  const onClickHandle = (uniqueSerialNumber) => {
    navigate(`/challenge/${uniqueSerialNumber}`);
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : challenges.length > 0 ? (
        challenges.map((challenge) => (
          <div
            key={challenge.uniqueSerialNumber}
            className="bg-gray-900 w-full bg-opacity-90 p-4 rounded-lg shadow-md"
          >
            <div className="text-xl text-center mb-2 font-bold text-white">
              {challenge.gname}
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
            <div className="text-gray-100 font-medium">
              Note: {challenge.note}
            </div>
            {challenge.status === "started" ? (
              <p className="text-center text-red-500 font-semibold mt-4">
                Challenge has started.
              </p>
            ) : (
              <button
                className="flex w-full bg-gray-700 bg-opacity-80 justify-center gap-x-2 text-gray-50 hover:text-white p-2 rounded-md transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600"
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