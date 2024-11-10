"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { MdAccountCircle } from "react-icons/md";
import NavButton from "./NavButton";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div
        className={`navbar px-4 md:px-8  fixed z-50 top-0 w-full transition-all duration-300 ${
          isScrolled ? "bg-zinc-900/70 backdrop-blur-md" : "bg-zinc-900"
        }`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle text-white "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content text-white bg-zinc-800 rounded-lg shadow-lg z-[1] mt-3 w-52 p-3  transform transition-all duration-300 ease-in-out hover:scale-105"
            >
              <li className="hover:bg-zinc-700 rounded-lg p-1 transition duration-200">
                <Link
                  href="/"
                  className="block px-2  text-base font-semibold hover:text-blue-500"
                >
                  Home
                </Link>
              </li>
              <li className="hover:bg-zinc-700 rounded-lg p-1 transition duration-200">
                <Link
                  href="/chat"
                  className="block px-2  text-base font-semibold hover:text-blue-500"
                >
                  Study Buddy
                </Link>
              </li>
              <li className="hover:bg-zinc-700 rounded-lg p-1 transition duration-200">
                <Link
                  href="/about"
                  className="block px-2  text-base font-semibold hover:text-blue-500"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link href="/">
            <div className={styles.logoContainer}>
              <span
                className={`${styles.textBuddy} font-bold text-[16px] md:text-2xl text-blue-100`}
              >
                Study
              </span>

              <img className={styles.logo} src="/logo.svg" alt="logo" />

              <span
                className={` ${styles.textBuddy} font-bold text-[16px] md:text-2xl text-blue-100`}
              >
                Buddy
              </span>
            </div>
          </Link>
        </div>
        <div className="navbar-end">
          <NavButton />
        </div>
      </div>
      <div className="pb-16"></div>
    </>
  );
}
