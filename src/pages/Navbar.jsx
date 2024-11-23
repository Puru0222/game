import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="text-white bg-gradient-to-r from-black via-gray-900 to-gray-800 relative z-20">
      {" "}
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-10">
        <div className="flex justify-between h-16 items-center">
          {/* Brand */}
          <h1 className="lg:text-2xl sm:text-xl font-bold">
            Game Challenger
          </h1>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 font-bold">
            {/* <Link
              to="/"
              className="hover:text-yellow-400 transition duration-300"
            >
              Home
            </Link> */}
            <Link
              to="/about"
              className="hover:text-yellow-400 transition duration-300"
            >
              About
            </Link>
            <Link
              to="/how-to-use"
              className="hover:text-yellow-400 transition duration-300"
            >
              How to Use
            </Link>
          </div>
          {/* Mobile Menu Button */}{" "}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden bg-gray-950 rounded-md p-1 focus:outline-none text-white"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-900 bg-opacity-55 px-2 pt-2 pb-3 space-y-1 z-30 backdrop-blur-lg font-bold">
          {/* <Link
            to="/"
            className="block px-3 py-2 text-base font-normal hover:bg-gray-700"
          >
            Home
          </Link> */}
          <Link
            to="/about"
            className="block px-3 py-2 text-base font-normal hover:bg-gray-700"
          >
            About
          </Link>
          <Link
            to="/howtouse"
            className="block px-3 py-2 text-base font-normal hover:bg-gray-700"
          >
            How to Use
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
