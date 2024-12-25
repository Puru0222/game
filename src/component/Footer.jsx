import React from "react";
import { Link } from "react-router-dom";

const BottomFooter = ["Privacy Policy", "Terms"];

const Footer = () => {
  return (
    <div className="bg-black bg-opacity-95 text-gray-200 border-t-4 border-orange-400 p-6">
      {/* Section 1 */}
      <div className="flex font-semibold justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
        <div className="flex flex-row">
          {BottomFooter.map((ele, i) => {
            return (
              <div
                key={i}
                className={` ${
                  BottomFooter.length - 1 === i
                    ? ""
                    : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                } px-8 `}
              >
                <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                  {ele}
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center flex">
          Made with
          <span className="flex mx-4 animate-ping">❤️</span>
          <a
            // href="https://github.com/Puru0222"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 font-bold"
            font-bold
          >
            Puru
          </a>
        </div>
        <div className="text-center">© 2024 Game Challenger</div>
      </div>
    </div>
  );
};

export default Footer;
