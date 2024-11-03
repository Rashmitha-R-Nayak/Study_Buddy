import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function DropZone() {
  return (
    <form className="flex items-center justify-center w-[350px] h-[150px] md:w-[900px] md:h-[225px] sm:p-4 z-10 opacity-85">
      <Label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-full transition duration-500 ease-in-out hover:scale-105   rounded-2xl cursor-pointer  bg-gray-800 opacity-85"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-xl text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-lg text-gray-400">.pdf</p>
        </div>
        <Input id="dropzone-file" type="file" name="file" className="hidden" />
      </Label>
    </form>
  );
}
