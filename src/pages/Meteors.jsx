import React, { useEffect, useState } from "react";

export function Meteors({ number }) {
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    const meteorArray = Array.from({ length: number }, (_, index) => index);
    setMeteors(meteorArray);
  }, [number]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      {meteors.map((meteor, idx) => (
        <div
          key={idx}
          className="absolute bg-gray-100 rounded-full"
          style={{
            width: "4px",
            height: "4px",
            animation: `meteor-animation 5s linear ${Math.random() * 2}s infinite`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        ></div>
      ))}
      <style jsx>{`
        @keyframes meteor-animation {
          0% {
            opacity: 1;
            transform: translateX(0) translateY(0);
          }
          50% {
           opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateX(-100vw) translateY(100vh);
          }
        }
      `}</style>
    </div>
  );
}
