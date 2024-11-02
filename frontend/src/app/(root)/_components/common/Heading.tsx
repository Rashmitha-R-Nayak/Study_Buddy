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
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const typingSpeed = 120;

  useEffect(() => {
    const typeText = (text: string, index: number) => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        setTimeout(() => typeText(text, index + 1), typingSpeed);
      } else {
        setIsTypingComplete(true);
      }
    };

    if (!lineTwoText) {
      lineTwoText = "";
    }
    typeText(lineTwoText, 0);
  }, [lineTwoText]);

  return (
    <h1
      className={`scroll-m-20  text-center bg-gradient-to-r
               from-zinc-200 via-blue-500 to-blue-600 
              bg-clip-text text-transparent ${className}`}
    >
      <p className={`text-7xl }`}>{lineOneText}</p>
      {displayedText}
      {!isTypingComplete && <span className={`${styles.typingCursor}`}></span>}
    </h1>
  );
}