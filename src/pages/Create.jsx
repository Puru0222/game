import React from "react";
import { Link } from "react-router-dom";

const Create = () => {
  return (
    <div className="bg-black bg-opacity-70 p-8 sm:p-10 rounded-lg shadow-lg w-full max-w-80 sm:max-w-lg md:max-w-xl lg:max-w-2xl border-black">
      <h1 className="text-3xl mb-6 mt-2 sm:text-4xl md:text-6xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-red-600 to-gray-200 drop-shadow-lg animate-breathe">
        Create Challenge
      </h1>

      <div className="w-full gap-6 flex flex-col place-items-center">
        <Link
          to="/bgmichallange"
          className="inline-flex animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-24 py-4 text-2xl text-slate-400 font-semibold focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:border-white hover:text-white transition-all duration-300 ease-in-out "
        >
          Bgmi
        </Link>

        <Link
          to="/ffchallange"
          className="inline-flex animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-20 py-4 text-2xl font-semibold  text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:border-white hover:text-white transition-all duration-300 ease-in-out "
        >
          FreeFire
        </Link>

        <Link
          to="/codchallange"
          className="inline-flex animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-16 py-4 font-semibold text-2xl  text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:border-white hover:text-white transition-all duration-300 ease-in-out "
        >
          CallOfDuty
        </Link>
      </div>
    </div>
  );
};

export default Create;
