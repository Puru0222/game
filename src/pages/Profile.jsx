import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import img from "../asset/profile.jpg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import { FaRegCopy } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import { resetChallenges } from "../slices/gameslices/challengeSlice";
import { logout } from "../slices/authSlice";
import { useDispatch } from "react-redux";

function Profile() {
  const [showReview, setShowReview] = useState(false);
  const [review, setReview] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [copied, setCopied] = useState(false);
  const { fullname, balance, email, uid } = useSelector((state) => state.auth);
  const handleCopy = () => {
    toast.success("Copied to clipboard!");
  };

  const dispatch = useDispatch();

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

  return (
    <div
      className="flex justify-center items-center h-screen w-full bg-cover bg-center bg-no-repeat "
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="bg-blue-100 bg-opacity-80 p-8 sm:p-10 rounded-lg shadow-lg transform transition-all w-11/12">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <button
            onClick={handleLogout}
            to="/dashboard/join"
            className="px-4 py-2 text-red-500 font-bold hover:text-white p-2 rounded-md transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-red-400 hover:to-red-600"
          >
            LogOut
          </button>
        </div>

        <div className="flex flex-col mb-2">
          <p className="text-gray-700 font-semibold mb-2">
            <span className="font-bold">Name: </span> {fullname}
          </p>
          <div className="flex  align-text-center rounded-md">
            <p className="text-gray-700 font-semibold mb-2">
              <span className="font-bold">User ID:</span> {uid}
            </p>
            <CopyToClipboard text={uid} onCopy={handleCopy}>
              <button className="hover:text-white transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 mx-4 mb-2 bg-white rounded p-1">
                <FaRegCopy className="flex text-base" />
              </button>
            </CopyToClipboard>
          </div>
          <p className="text-gray-700 font-semibold mb-2 overflow-x-auto whitespace-nowrap">
            <span className="font-bold">Email:</span> {email}
          </p>
        </div>
        <hr className="border-gray-400 mb-2" />

        <div className="flex flex-col mb-6">
          <p className="text-gray-700 font-semibold mb-2">
            <span className="font-bold">Balance:</span> ₹ {balance}
          </p>
          <Link
            to="/add"
            className="bg-orange-600 font-semibold m-1 text-white py-2 px-4 rounded"
          >
            Add
          </Link>
          <Link to="/Withdraw" className="m-1 text-white rounded">
            <div className="bg-white h-10 w-full py-2 px-4 flex justify-center items-center relative">
              {/* Ashoka Chakra (Wheel) */}
              <div className="h-10 absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="blue"
                  strokeWidth="3"
                  className="w-full h-full"
                >
                  <circle cx="50" cy="50" r="45" />
                  {[...Array(24)].map((_, i) => (
                    <line
                      key={i}
                      x1="50"
                      y1="5"
                      x2="50"
                      y2="20"
                      transform={`rotate(${i * 15} 50 50)`}
                    />
                  ))}
                </svg>
                <p className="text-center text-lg text-blue-800 font-bold absolute top-0 w-11/12 -left-28 sm:-left-64 md:-left-80 lg:-left-96 mt-2">
                  Withdraw
                </p>
              </div>
            </div>
          </Link>
          <Link
            to="/complain"
            className="bg-green-600 m-1 font-semibold text-white py-2 px-4 rounded duration-300"
          >
            Complain
          </Link>
        </div>
        <hr className="border-gray-400 mb-2" />
        <div className="mb-4">
          <button
            onClick={() => setShowReview(!showReview)}
            className="text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-300"
          >
            {showReview ? "Cancel Review" : "Give Review"}
          </button>

          {showReview && (
            <div className="mt-2 space-y-2">
              <textarea
                value={review}
                onChange={(e) => {
                  const words = e.target.value.split(/\s+/).filter(Boolean); // Split by spaces and filter out empty strings
                  if (words.length <= 50) {
                    setReview(e.target.value);
                  }
                }}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Review Will be taken only once, Write your review here (max 50 words)..."
              />
              <div className="text-sm text-gray-500">
                {review.split(/\s+/).filter(Boolean).length}/22 words
              </div>
              <button
                onClick={handleReviewSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
              >
                Submit Review
              </button>
            </div>
          )}
        </div>

        {/* Delete Account Section */}
        <div className="mt-4">
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="text-red-500 font-semibold hover:text-red-700 transition-colors duration-300"
            >
              Delete Account
            </button>
          ) : (
            <div className="space-y-2">
              <p className="text-red-600 font-medium">
                Are you sure you want to delete your account? Your account will
                be deleted after 22 dayes. This action cannot be undone.
              </p>
              <div className="space-x-2">
                <button
                  onClick={handleDeleteAccount}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                >
                  Yes, Delete Account
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
