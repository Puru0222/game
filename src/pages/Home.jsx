import React from "react";
import pic1 from "../asset/pic1.webp";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div
        className="relative flex items-center justify-center w-full h-full min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${pic1})` }}
      >
        {/* Add an overlay to enhance readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content Section */}
        <div className="relative z-10 text-center px-6">
          <h1 className="font-extrabold text-4xl sm:text-6xl lg:text-7xl text-yellow-50 mb-4">
            Join the Ultimate Battleground for Gamers!
          </h1>
          <p className="text-lg sm:text-base lg:text-2xl text-yellow-100 max-w-3xl mx-auto mb-6">
            Compete in PUBG, FreeFire, and More for Real Rewards. Create or Join
            Tournaments
          </p>
          <Link to={"/loginSignup"}>
            <button className="px-6 py-3 lg:mt-4 sm:mt-3 bg-yellow-500 text-yellow-50 font-bold rounded-full shadow-lg hover:bg-yellow-700 transition duration-300 animate-breathe">
              Get Started
            </button>
          </Link>
          {/* <Link to={"/updateData"}>
            <button className="px-6 py-3 lg:mt-4 sm:mt-3 bg-yellow-500 text-yellow-50 font-bold rounded-full shadow-lg hover:bg-yellow-700 transition duration-300">
              update
            </button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
