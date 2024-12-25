import React from "react";

export const HowToUse = () => {
  return (
    <div className="h-screen dark:bg-black bg-white relative flex items-center justify-center">
      {/* Background grid */}
      <div
        className="absolute inset-0 bg-grid pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 2px, transparent 2px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 2px, transparent 2px)
          `,
          backgroundSize: "30px 30px", // Adjust grid size here
        }}
      ></div>

      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        Backgrounds
      </p>
    </div>
  );
};
