// src/components/InfiniteMovingImages.jsx
import React, { useEffect, useState } from "react";

const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export const InfiniteMovingImages = ({
  images,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
  backgroundImage,
  title,
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      setStart(true);
    }
  }

  const getSpeed = () => {
    switch (speed) {
      case "fast":
        return 20;
      case "normal":
        return 40;
      case "slow":
        return 60;
      default:
        return 40;
    }
  };

  return (
    <div
      className={cn(
        "flex m-4  w-11/12 overflow-hidden rounded-md bg-center flex-col",
        className
      )}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className=" flex flex-col justify-center items-center ">
        

        <div
          ref={containerRef}
          className="scroller relative z-20 overflow-hidden w-full"
        >
          <div
            ref={scrollerRef}
            className={cn(
              "flex gap-4 py-4 w-max flex-nowrap",
              start && "animate-scroll",
              pauseOnHover && "hover:[animation-play-state:paused]"
            )}
            style={{
              "--animation-duration": `${getSpeed()}s`,
              animationDirection: direction === "left" ? "normal" : "reverse",
            }}
          >
            {images.map((src, idx) => (
              <div key={idx} className="inline-block w-[300px] shrink-0">
                <img
                  src={src}
                  alt={`Slide ${idx + 1}`}
                  className="w-4/5 h-auto object-cover rounded-lg shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
        <style jsx>{`
          @keyframes scroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(calc(-50%));
            }
          }

          .animate-scroll {
            animation: scroll var(--animation-duration) linear infinite;
          }
        `}</style>
      </div>
    </div>
  );
};
