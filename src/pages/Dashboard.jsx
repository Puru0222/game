import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
// import img1 from "../asset/ffdash.jpeg";
// import img2 from "../asset/pdash.webp";
import img from "../asset/verifysignup.webp";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Meteors } from "./Meteors";
import { fetchUserAndChallenges } from "../services/authAPI";
import { useDispatch } from "react-redux";

function Dashboard() {
  const { fullname, balance, token } = useSelector((state) => state.auth);
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Automatically collapse after 1 minute
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 60000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserAndChallenges(token));
    }
  }, [dispatch, token]);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div
      className="flex flex-col items-center overflow-hidden bg-cover bg-center bg-fixed h-screen"
      style={{ backgroundImage: `url(${img})` }}
    >
      {/* Main Card */}
      <Meteors number={70} />
      <div
        ref={containerRef}
        className="transition-all duration-300 w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl"
      >
        {isVisible ? (
          <div
            className="p-4 mt-4 mb-4 px-6 rounded-lg shadow-2xl transition-transform transform"
            style={{
              background:
                "conic-gradient(from 45deg at 50% 50%, #1e3a8a, #3b82f6, #357ef3, #1d4ed8)",
            }}
          >
          {/* "conic-gradient(from 45deg at 50% 50%, #1e3a8a, #296bd5, #60a5fa, #1d4ed8)", */}
           
            {" "}
            {/* User Info Section */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-white font-bold text-xl">
                <span role="img" aria-label="waving hand">
                  👋
                </span>{" "}
                <span> {fullname}</span>
              </p>
              <Link
                to="/mychallenge"
                className="px-4 py-2 text-white font-bold hover:text-blue-800 p-2 rounded-md transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-blue-200 hover:to-blue-300"
              >
                Challenge
              </Link>
            </div>
            {/* Stats Section */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-bold text-gray-100">
                Balance: {balance}{" "}
              </p>

              <Link
                to="/profile"
                className="relative text-white font-bold hover:text-blue-800 p-2 rounded-md transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-200"
              >
                Profile
              </Link>
            </div>
          </div>
        ) : (
          <button
            onClick={toggleVisibility}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-lg m-2 flex items-center space-x-2 shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            {/* Person Icon */}

            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-white"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M14 14H10c-4 0-6 2-6 6h16c0-4-2-6-6-6z" />
            </svg>

            {/* Fullname */}
          </button>
        )}
        {/* Navigation Section */}
      </div>

      <div className="flex sticky top-0 z-10 shadow-md bg-black justify-between w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl p-4 px-7 rounded-lg bg-opacity-60 hover:shadow-3xl mt-3 animate-float">
        <Link
          to="/dashboard/join"
          className={`px-4 py-2 font-bold rounded-md transition-colors ${
            location.pathname === "/dashboard/join"
              ? "bg-blue-500 text-white" 
              : "bg-blue-100 text-blue-700 hover:bg-blue-300"
          }`}
        >
          Join
        </Link>
        <Link
          to="/dashboard/create"
          className={`px-4 py-2 font-bold rounded-md transition-colors ${
            location.pathname === "/dashboard/create"
              ? "bg-blue-500 text-white" 
              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
          }`}
        >
          Create
        </Link>
      </div>

      <div className="flex-1 w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl overflow-y-auto">
        {" "}
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
