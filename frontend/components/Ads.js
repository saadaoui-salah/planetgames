"use client";

import { useState, useEffect } from "react";
import { LeftArrow, RightArrow } from "./shared/Icons";
import Image from "next/image";
import Banner1 from "@/public/static/banner1.jpg"

export const Ads = () => {
  let images = [Banner1]
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 2500);
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  function handleNext() {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  }
  function handlePrev() {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  }

  return (
    <div className="overflow-hidden p-16 flex items-center justify-center">
      <div className="relative max-w-8xl">
        <button
          className="absolute font-bold hover:opacity-100 text-lg top-[41%] mx-4 p-4 opacity-75 rounded-full bg-purple-400 text-black"
          onClick={handlePrev}
        >
          <LeftArrow />
        </button>
        {images[currentIndex] && (
          <Image
            width={1200}
            height={1200}
            onClick={() => window.location.replace(images[currentIndex]?.link)}
            className="min-w-[20rem] cursor-pointer rounded-lg max-h-[35rem]"
            src={Banner1}
            alt="Ads"
          />
        )}
        <button
          className="absolute font-bold text-lg top-[41%] right-0 mx-4 p-4 opacity-75 hover:opacity-100 rounded-full bg-purple-400 text-black"
          onClick={handleNext}
        >
          <RightArrow />
        </button>
      </div>
    </div>
  );
};
