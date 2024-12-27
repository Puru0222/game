import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  FaRegCopy,
  FaUserCircle,
  FaSignOutAlt,
  FaTrash,
  FaCoins,
  FaCommentAlt,
  FaExclamationCircle,
} from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { resetChallenges } from "../slices/gameslices/challengeSlice";
import { logout } from "../slices/authSlice";
import img from "../asset/profile.jpg";

function Profile() {
  const [showReview, setShowReview] = useState(false);
  const [review, setReview] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { fullname, balance, email, uid } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleCopy = () => toast.success("User ID copied to clipboard!");
  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetChallenges());
  };

  const handleReviewSubmit = () => {
    // Handle review submission logic here
    if (review.trim()) {
      toast.success("Review submitted successfully!");
      setReview("");
      setShowReview(false);
    } else {
      toast.error("Please write a review before submitting");
    }
  };

  const handleDeleteAccount = () => {
    // Handle account deletion logic here
    toast.success("Account deleted successfully");
    dispatch(logout());
    dispatch(resetChallenges());
  };

  const ProfileSection = ({ title, children, icon }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 rounded-lg p-3 shadow-lg mb-4"
    >
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="font-semibold text-base text-gray-800">{title}</h2>
      </div>
      {children}
    </motion.div>
  );

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat p-6 md:p-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${img})`,
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto"
      >
        {/* Header Section */}
        <ProfileSection
          title="Profile Details"
          icon={<FaUserCircle className="text-blue-600 text-2xl" />}
        >
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <p className="text-gray-600">Name</p>
                <p className="font-semibold">{fullname}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <FaSignOutAlt /> Logout
              </motion.button>
            </div>

            <div className="flex items-center gap-1">
              <div className="flex-1">
                <p className="text-gray-600">User ID</p>
                <p className="font-semibold">{uid}</p>
              </div>
              <CopyToClipboard text={uid} onCopy={handleCopy}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <FaRegCopy className="text-blue-600" />
                </motion.button>
              </CopyToClipboard>
            </div>

            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-semibold truncate">{email}</p>
            </div>
          </div>
        </ProfileSection>

        {/* Balance Section */}
        <ProfileSection
          title="Balance & Transactions"
          icon={<FaCoins className="text-yellow-500 text-xl" />}
        >
          <div className="space-y-2">
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-4 rounded-lg text-white">
              <p className="text-sm">Current Balance</p>
              <p className="text-xl font-bold">₹ {balance}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/add"
                className="bg-green-500 text-white py-2 px-4 rounded-lg text-center hover:bg-green-600 transition-colors"
              >
                Add Money
              </Link>
              <Link
                to="/Withdraw"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-600 transition-colors"
              >
                Withdraw
              </Link>
            </div>
          </div>
        </ProfileSection>

        {/*Complain Section */}
        <ProfileSection
          title="Complain"
          icon={<BiSupport  className="text-purple-600 text-2xl" />}
        >
          <div className="space-y-4">
            {/* Review Section */}
            <AnimatePresence>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/complain" className="flex-1">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaExclamationCircle />{" "}
                    {/* Import this icon from react-icons/fa */}
                    Submit Complain
                  </motion.button>
                </Link>
              </div>
            </AnimatePresence>
          </div>
        </ProfileSection>
        {/* Review Section */}
        <ProfileSection
          title="Review"
          icon={<FaCommentAlt className="text-purple-600 text-xl" />}
        >
          <AnimatePresence>
            {showReview ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3"
              >
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Share your experience..."
                  rows="4"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowReview(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      toast.success("Thank you for your feedback!");
                      setShowReview(false);
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </div>
              </motion.div>
            ) : (
              <button
                onClick={() => setShowReview(true)}
                className="text-blue-500 hover:text-blue-600"
              >
                Give Review
              </button>
            )}
          </AnimatePresence>
        </ProfileSection>


        {/* Delete Account Section */}
        <ProfileSection
          title="Danger Zone"
          icon={<FaTrash className="text-red-500 text-xl" />}
        >
          <AnimatePresence>
            {showDeleteConfirm ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-red-50 p-1 rounded-lg border border-red-200"
              >
                <p className="text-red-600 mb-2">
                  Are you sure? This action cannot be undone. Your account will
                  be scheduled for deletion after 22 days.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      toast.success("Account scheduled for deletion");
                      handleLogout();
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Confirm Delete
                  </button>
                </div>
              </motion.div>
            ) : (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="text-red-500 hover:text-red-600"
              >
                Delete Account
              </button>
            )}
          </AnimatePresence>
        </ProfileSection>
      </motion.div>
    </div>
  );
}

export default Profile;
