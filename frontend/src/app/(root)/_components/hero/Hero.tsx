import React from "react";
import Heading from "../common/Heading";
import SubHeading from "../common/SubHeading";

export default function Hero() {
  return (
    <div className="flex flex-col gap-1 md:gap-4 items-center text-center">
      <Heading
        className="font-extrabold  leading-6 p-2 md:p-4"
        lineOneText="Revolutionize Your Study"
        lineTwoText="Routine With Study Buddy"
      />
      <SubHeading
        className="scroll-m-20 mx-auto  font-[500] max-w-3xl text-center text-[16px] sm:text-2xl text-zinc-400"
        lineOneText="Effortlessly interact with your PDFs, notes, resumes, and more."
        lineTwoText="Enhancing your learning experience and productivity like never before"
      />
    </div>
  );
}
