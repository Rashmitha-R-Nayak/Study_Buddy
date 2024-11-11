import React from "react";
import CarouselAuto from "./CarouselAuto";

export default function CarouselSection() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 bg-gradient-to-b from-gray-800 via-gray-900 to-black p-8">
      <h1 className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-blue-300 via-blue-500 to-blue-600 bg-clip-text text-transparent text-center py-6">
        Meet Your Study Buddy
      </h1>
      <h2 className="text-lg sm:text-xl text-gray-300 text-center max-w-3xl px-4">
        Discover the features that make learning more efficient and engaging.
        Get ready to take your productivity to the next level with your new
        study assistant.
      </h2>
      <div className="w-full max-w-5xl mt-8">
        <CarouselAuto />
      </div>
    </div>
  );
}
