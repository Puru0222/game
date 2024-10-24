import React from 'react';
import { Meteors } from './Meteors';

const About = () => {
  return (
    <div className="relative flex h-screen w-full bg-black">
      {/* Meteor effect */}
      <Meteors number={20} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full text-white">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg">
          Welcome to the About page! Enjoy the cool meteor background effect.
        </p>
      </div>
    </div>
  );
}

export default About;
