"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (!mounted) {
    return null;
  }
  return (
    <div className="flex z-40">
      <div
        className={`fixed top-0 left-0 h-screen bg-black text-white w-80 transition-transform duration-300 ease-in-out ${
          isOpen ? "transform translate-x-0" : "transform -translate-x-full"
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-1/2 right-[-35px] transform -translate-y-1/2 bg-zinc-700 text-zinc-400 font-bold p-2 hover:text-zinc-100 rounded-full focus:outline-none"
        >
          <IoIosArrowBack />
        </button>
        <div className="p-4 h-full flex flex-col">
          <h2 className="text-2xl font-bold mb-4 pt-16 py-8">Study Buddy</h2>
          {/* <FileUpload /> */}
          <h1>Dropzone</h1>
          <div className="overflow-y-auto flex-1">
            <ul className="space-y-4 py-10 px-2">
              <li>File 1</li>
              <li>File 2</li>
              <li>File 3</li>
            </ul>
          </div>
        </div>
      </div>

      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-1/2 left-1 transform -translate-y-1/2 bg-zinc-700 text-zinc-400 hover:text-zinc-100 rounded-full p-2 focus:outline-none"
        >
          <IoIosArrowForward />
        </button>
      )}
    </div>
  );
}
