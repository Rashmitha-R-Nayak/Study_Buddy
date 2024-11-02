import React from "react";
import Heading from "../common/Heading";
import SubHeading from "../common/SubHeading";
import DropZone from "./Dropzone";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <div
      className={`${styles.heroBackground} flex flex-col gap-1 md:gap-4 items-center text-center`}
    >
      <div className={styles.wavePattern}></div>

      <div className={styles.geometricShape}></div>

      <Heading
        className="font-extrabold  leading-6 p-2 md:p-6"
        lineOneText="Revolutionize Your Study"
        lineTwoText="Routine With Study Buddy"
      />
      <SubHeading
        className="scroll-m-20 mx-auto leading-10 font-[500] max-w-3xl text-center text-[16px] sm:text-2xl text-zinc-500"
        lineOneText="Effortlessly interact with your PDFs, notes, resumes, and more."
        lineTwoText="Enhancing your learning experience and productivity like never before"
      />
      <DropZone />
    </div>
  );
}
