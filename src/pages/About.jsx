import React from "react";
import { Meteors } from "./Meteors";

const About = () => {
  return (
    <div className="relative justify-center flex h-screen w-full bg-black">
      {/* Meteor effect */}
      <Meteors number={20} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-10/12 text-white">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        <p className="text-lg mb-1">
          This is a gaming platform designed for gamers to compete in
          tournaments, earn rewards, and showcase their skills. The app allows
          users to create and participate in game-specific challenges for
          popular titles like Free Fire, BGMI, and Call of Duty.
        </p>

        <p className="text-lg">
          Features Create Tournaments: Users can host their own tournaments by
          setting an entry fee, selecting a game type, and customizing prize
          distribution. Hosts earn 15% of the collected entry fees. Tournament
          Listing: A centralized dashboard that displays all available
          tournaments, making it easy for users to find and join active
          challenges. Tournament Details: Provides complete information about
          each tournament, including participants, prize pool breakdown, room
          ID, and match schedules. Join Tournaments: Seamlessly join a
          tournament by paying the required entry fee. Winners take home 80% of
          the total prize pool.
        </p>
      </div>
    </div>
  );
};

export default About;
