import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
// import img1 from "../asset/ffdash.jpeg";
// import img2 from "../asset/pdash.webp";
import img from "../asset/verifysignup.webp";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Meteors } from "./Meteors";


function Dashboard() {
  const { fullname, balance, uid } = useSelector((state) => state.auth);
  // const [backgroundImage, setBackgroundImage] = useState(`url(${img1})`);
  const location = useLocation();
  // useEffect(() => {
  //   // Array of background image URLs
  //   const images = [`url(${img1})`, `url(${img2})`];

  //   let index = 0;
  //   const changeBackground = () => {
  //     index = (index + 1) % images.length;
  //     setBackgroundImage(images[index]);
  //   };

  //   const intervalId = setInterval(changeBackground, 5000);

  //   return () => clearInterval(intervalId);
  // }, []);

  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    // Automatically collapse after 1 minute
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 60000); // 1 minute in milliseconds

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []);

  useEffect(() => {
    // Function to handle clicks outside the component
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsVisible(false);
      }
    };

    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          <div className="p-4 mt-4 mb-4 px-6 bg-teal-900 bg-opacity-75 rounded-lg shadow-2xl  transition-transform transform hover:scale-105 hover:shadow-3xl ">
            {/* User Info Section */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-100 font-bold text-xl">
                <span role="img" aria-label="waving hand">
                  👋
                </span>{" "}
                <span> {fullname}</span>
              </p>
              <button className="px-4 py-2 text-red-500 font-bold hover:text-white p-2 rounded-md transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-red-400 hover:to-red-600">
                LogOut
              </button>
            </div>

            {/* Stats Section */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-bold text-gray-100">
                Balance: {balance}{" "}
              </p>

              <Link
                to="/profile"
                className="relative text-blue-300 font-bold hover:text-white p-2 rounded-md transition-all duration-500 ease-in-out hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600"
              >
                Profile
              </Link>
            </div>
          </div>
        ) : (
          <button
            onClick={toggleVisibility}
            className="bg-blue-500 text-white py-2 px-4 rounded m-2"
          >
            {fullname}
          </button>
        )}
        {/* Navigation Section */}
      </div>

      <div className="flex sticky top-0 z-10 shadow-md bg-black justify-between w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl p-4 px-7 rounded-lg bg-opacity-60 transition-transform transform hover:scale-105 hover:shadow-3xl">
        <Link
          to="/dashboard/join"
          className={`px-4 py-2 rounded-md transition-colors ${
            location.pathname === "/dashboard/join"
              ? "bg-blue-500 text-white" // Active link styles
              : "bg-blue-100 text-blue-700 hover:bg-blue-300"
          }`}
        >
          Join
        </Link>
        <Link
          to="/dashboard/create"
          className={`px-4 py-2 rounded-md transition-colors ${
            location.pathname === "/dashboard/create"
              ? "bg-blue-500 text-white" // Active link styles
              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
          }`}
        >
          Create
        </Link>
      </div>

      
      <div className="flex-1 w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl mt-2 overflow-y-auto">
        {" "}
        {/* Add margin-top to push content down */}
        {/* Your main content goes here */}
        <Outlet />
      </div>
      </div>
  );
}

export default Dashboard;
