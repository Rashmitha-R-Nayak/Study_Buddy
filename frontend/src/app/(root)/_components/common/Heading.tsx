"use client";
import React, { useState, useEffect } from "react";
import styles from "./Common.module.css";
type HeadingProps = {
  lineOneText: string;
  lineTwoText?: string;
  className?: string;
};

export default function Heading({
  lineOneText,
  lineTwoText,
  className,
}: HeadingProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const typingSpeed = 120;

  useEffect(() => {
    const textToType = lineTwoText || "";
    const typeText = (text: string, index: number) => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        setTimeout(() => typeText(text, index + 1), typingSpeed);
      } else {
        setIsTypingComplete(true);
      }
    };
    typeText(textToType, 0);
  }, [lineTwoText]);

  return (
    <h1
      className={`scroll-m-20  text-center bg-gradient-to-r
               from-zinc-300 via-blue-500 to-blue-600 
              bg-clip-text text-transparent ${className}`}
    >
      <p className="text-xl sm:text-6xl">{lineOneText}</p>
      <span className="md:text-7xl text-2xl">{displayedText}</span>
      {!isTypingComplete && <span className={`${styles.typingCursor}`}></span>}
    </h1>
  );
}
