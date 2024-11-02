"use client";
import React, { useEffect, useState } from "react";

type SubHeadingProps = {
  lineOneText: string;
  lineTwoText?: string;
  className?: string;
};

export default function SubHeading({
  lineOneText,
  lineTwoText,
  className,
}: SubHeadingProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);
  return (
    <h3
      className={`transition-opacity duration-500 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${className}`}
    >
      {lineOneText}
      <br />
      {lineTwoText}
    </h3>
  );
}
