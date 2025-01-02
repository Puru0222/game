import React, { useEffect, useState } from "react";
import pic1 from "../asset/pic1.webp";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "../component/Footer";
import home1 from "../asset/home1.jpeg";
import home2 from "../asset/home2.jpeg";
import home3 from "../asset/home3.jpeg";
import noise from "../asset/darkened_noise.jpg";
import { GiReceiveMoney } from "react-icons/gi";
import { BiSupport } from "react-icons/bi";
import { RiTeamFill } from "react-icons/ri";
import { BsFillPersonXFill } from "react-icons/bs";
import FAQ from "./Faq";
import { FaDiscord, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import { getReviews } from "../services/authAPI";
import { InfiniteMovingCards } from "../component/InfiniteMovingCards";
import { InfiniteMovingImages } from "../component/InfiniteMovingImages";

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const images = [home3, home1, home2, home3, home1, home2];

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getReviews();
        if (response.data.success) {
          setReviews(response.data.reviews);
        } else {
          console.error("Failed to fetch reviews:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="bg-black/90 pt-20">
      <Navbar />
      <div
        className="relative flex items-center justify-center w-full min-h-screen bg-cover bg-center border-b-4 border-orange-400"
        style={{ backgroundImage: `url(${pic1})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="font-extrabold text-4xl sm:text-6xl lg:text-7xl text-yellow-50 mb-5">
            Join the Ultimate Battleground for Gamers!
          </h1>
          <p className="text-lg sm:text-lg lg:text-2xl text-gray-100 max-w-3xl mx-auto mb-6">
            Compete in BGMI, FreeFire, Call of Duty, and More for Real Rewards.
            Create or Join Tournaments
          </p>
          <Link to={"/loginSignup"}>
            <button className="px-6 mb-10 py-3 lg:mt-4 sm:mt-3 bg-blue-600 text-yellow-50 font-bold rounded-full shadow-lg hover:bg-blue-700 transition duration-300 animate-breathe">
              Get Started
            </button>
          </Link>
        </div>
      </div>
      <div className="bg-black relative flex items-center flex-col justify-center">
        {/* Background grid */}
        <div
          className="absolute inset-0 bg-grid pointer-events-none"
          style={{
            backgroundImage: `
            linear-gradient(to right, grey 2px, transparent 2px),
            linear-gradient(to bottom, grey 2px, transparent 2px)
          `,
            backgroundSize: "40px 40px", // Adjust grid size here
          }}
        ></div>

        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 p-6">
          {/* Instant Withdrawal */}
          <div className="flex flex-col items-center justify-center bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg p-6 shadow-md transform transition hover:scale-105">
            <GiReceiveMoney className="text-5xl mb-4" />
            <h3 className="text-xl font-semibold">Instant Withdrawal</h3>
            <p className="text-sm mt-2">Get your winnings within 60 minutes.</p>
          </div>

          {/* 24/7 Support */}
          <div className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg p-6 shadow-md transform transition hover:scale-105">
            <BiSupport className="text-5xl mb-4" />
            <h3 className="text-xl font-semibold">24/7 Support</h3>
            <p className="text-sm mt-2">
              We're here to help, anytime you need us.
            </p>
          </div>

          {/* Team Challenges */}
          <div className="flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg p-6 shadow-md transform transition hover:scale-105">
            <RiTeamFill className="text-5xl mb-4" />
            <h3 className="text-xl font-semibold">Team Challenges</h3>
            <p className="text-sm mt-2">
              Gather your team and challenge others!
            </p>
          </div>
          <div className="flex flex-col items-center justify-center bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg p-6 shadow-md transform transition hover:scale-105 max-w-md mx-auto">
            <BsFillPersonXFill className="text-5xl mb-4" />

            <h3 className="text-xl font-semibold">File a Complaint</h3>
            <p className="text-sm mt-2 text-center">
              Not received your winning prize? Complain about the challenge
              creator, and we'll assist you promptly.
            </p>
          </div>
        </div>

        <div
          className="flex m-4 z-10 w-11/12 overflow-hidden rounded-md bg-center flex-col"
          style={{ backgroundImage: `url(${noise})` }}
        >
          <div className="m-4 flex flex-col justify-center items-center z-20">
            {" "}
            {/* Overlap and background */}
            <h2 className="text-center text-3xl font-bold text-gray-100">
              Make Challenges In
            </h2>
            <div className="overflow-hidden relative">
              <InfiniteMovingImages
                images={images}
                direction="right"
                speed="normal"
                pauseOnHover={true}
                title="Make Challenges In"
              />
            </div>
          </div>
        </div>
      <div className="z-20 m-4 mb-6 w-11/12 overflow-hidden rounded">
        <div className="bg-neutral-900  py-4 ">
          <div className="max-w-8xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-center text-white mb-2">
              What Players Are Saying
            </h2>

            <InfiniteMovingCards
              items={reviews.map((review) => ({
                quote: review.comment,
                name: review.fullname,
                title: `UID: ${review.uid}`,
              }))}
              direction="left"
              speed="normal"
              pauseOnHover={true}
              className="py-2"
            />
          </div>
        </div>
      </div>
      </div>

      <div className="bg-black py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-white sm:text-4xl">
              Connect With Us
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-base text-gray-300 sm:text-xl sm:mt-4">
              Join our community on Discord and follow us on Instagram for
              updates and exclusive content
            </p>
          </div>

          <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row justify-center items-center gap-6">
            {/* Discord Card */}
            <a
              href="https://discord.gg/XnMRZHqmka"
              target="_blank"
              rel="noopener noreferrer"
              className="group transform transition duration-500 hover:scale-105"
            >
              <div className="bg-[#5865F2] rounded-lg p-6 flex flex-col items-center w-72 mx-auto">
                <FaDiscord className="h-12 w-12 text-white group-hover:animate-bounce" />
                <h3 className="mt-4 text-lg font-medium text-white">
                  Join Discord
                </h3>
                <p className="mt-2 text-sm text-gray-200 text-center">
                  Connect with our gaming community
                </p>
              </div>
            </a>

            {/* Instagram Card */}
            <a
              href="https://www.instagram.com/gamechallenger.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="group transform transition duration-500 hover:scale-105"
            >
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 flex flex-col items-center w-72 mx-auto">
                <FaInstagram className="h-12 w-12 text-white group-hover:animate-spin-slow" />
                <h3 className="mt-4 text-lg font-medium text-white">
                  Follow Instagram
                </h3>
                <p className="mt-2 text-sm text-gray-200 text-center">
                  Stay updated with the latest news
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;
