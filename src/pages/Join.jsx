import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetChallenges,
  saveChallenges,
} from "../slices/gameslices/challengeSlice";
import { fetchChallenges } from "../services/bgmiAPI";
import { motion } from "framer-motion";
import { FiUsers, FiMap, FiInfo } from "react-icons/fi";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { GiTrophy } from "react-icons/gi";

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-black rounded bg-opacity-60 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-6"
      >
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Available Challenges
        </h1>
        <p className="text-blue-300 text-center">
          Join exciting gaming challenges and compete with others
        </p>
      </motion.div>

      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center items-center p-8"
        >
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </motion.div>
      ) : challenges.length > 0 ? (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {challenges.map((challenge) => (
            <motion.div
              key={challenge.uniqueSerialNumber}
              variants={item}
              className="bg-white/10 backdrop-blur-lg rounded-xl border border-blue-500/30 overflow-hidden hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <GiTrophy className="text-yellow-400 text-2xl" />
                    <h2 className="text-xl font-bold text-white">
                      {challenge.gname}
                    </h2>
                  </div>
                  <span className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-300 text-sm">
                    {challenge.fullname}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-gray-300">
                    <div className="flex items-center space-x-2">
                      <FiUsers className="text-blue-400" />
                      <span>Team Mode: {challenge.teamMode}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiMap className="text-blue-400" />
                      <span>Map: {challenge.map}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-gray-300">
                    <div className="flex items-center space-x-2">
                      <FiUsers className="text-blue-400" />
                      <span>Players: {challenge.players}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MdOutlineCurrencyRupee className="text-blue-400" />
                      <span>Entry: {challenge.price}</span>
                    </div>
                  </div>

                  {challenge.note && (
                    <div className="flex items-start space-x-2 text-gray-300">
                      <FiInfo className="text-blue-400 mt-1 flex-shrink-0" />
                      <p className="text-sm">{challenge.note}</p>
                    </div>
                  )}
                </div>

                {/* Status/Action */}
                {challenge.status === "started" ? (
                  <div className="text-center py-2 px-4 bg-red-500/20 rounded-lg text-red-400">
                    Challenge has started
                  </div>
                ) : challenge.status === "completed" ? (
                  <div className="text-center py-2 px-4 bg-green-500/20 rounded-lg text-green-400">
                    Challenge completed
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onClickHandle(challenge.uniqueSerialNumber)}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                  >
                    View Challenge
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center p-8 bg-white/5 backdrop-blur-lg rounded-xl border border-blue-500/30"
        >
          <img
            src="/empty-state.svg" // Add an appropriate empty state illustration
            alt="No challenges"
            className="w-48 h-48 mb-4 opacity-50"
          />
          <p className="text-xl font-semibold text-gray-300 mb-2">
            No Challenges Available
          </p>
          <p className="text-gray-400 text-center">
            Check back later for new gaming challenges
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default Join;
