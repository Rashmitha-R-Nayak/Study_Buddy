"use client";
import { fetchWithAuth } from "@/lib/api";
import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { DropZoneInput } from "./DropzoneInput";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pdfs, setPdfs] = useState([
    {
      id: "",
      fileName: "",
    },
  ]);
  const handleFetch = async () => {
    try {
      const response = await fetchWithAuth("/pdfs/");
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      const pdfs = data.map((pdf: { id: string; file: string }) => {
        const url = new URL(pdf.file);
        const pdfName = url.pathname.split("/").pop();
        return { id: pdf.id, fileName: pdfName };
      });
      setPdfs(pdfs);
    } catch (error) {
      console.log("Failed to fetch PDFs:");
      return [];
    }
  };

  useEffect(() => {
    handleFetch();
    setMounted(true);
  }, []);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (!mounted) {
    return null;
  }

  const handleFileUploadSuccess = () => {
    handleFetch();
  };
  return (
    <div className="flex z-40">
      <div
        className={`fixed top-0 left-0 h-screen bg-gray-950 text-white md:64 w-80 transition-transform duration-300 ease-in-out ${
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
          <h2 className="text-2xl font-bold mb-4 pt-16 py-2">Study Buddy</h2>
          <DropZoneInput onUploadSuccess={handleFileUploadSuccess} />
          <div className="overflow-y-auto flex-1 mt-6 border-t border-gray-700">
            <ul className="space-y-4 mt-4">
              {pdfs.map((pdf, index) => (
                <li key={index} className="break-words">
                  <Link
                    href={`/chat/${pdf.id}`}
                    className="block text-gray-400 text-lg hover:text-white transition-colors duration-200"
                  >
                    {pdf.fileName}
                  </Link>
                </li>
              ))}
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
