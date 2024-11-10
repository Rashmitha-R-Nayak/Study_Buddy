"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { fileUpload } from "@/actions/action";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/loading_indicators/Loading";
import { fetchWithAuth } from "@/lib/api";
import { useCheckLogin } from "@/lib/userCheckLogin";

export default function DropZone() {
  const { user, userId } = useCheckLogin();
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("user", userId);
    try {
      setIsLoading(true);
      const response = await fetchWithAuth("/pdfs/", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data) {
        console.log(data);
      }
      setFileName("");
      setIsLoading(false);
    } catch (error) {
      console.log("Error occured while uploading the file");
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center w-[350px] h-[150px] md:w-[900px] md:h-[225px] sm:p-4 z-10 opacity-85"
    >
      <Label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-full transition duration-500 ease-in-out hover:scale-105   rounded-2xl cursor-pointer  bg-gray-800 opacity-85"
      >
        {fileName ? (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <p className="mb-2 text-xl text-gray-400">
              <span className="font-semibold">{fileName}</span>
            </p>
            <Button
              type="submit"
              className="mt-4  bg-zinc-900 transition-colors duration-300 ease-in-out hover:bg-zinc-600"
            >
              {isLoading ? <LoadingSpinner /> : "Upload"}
            </Button>
          </div>
        ) : (
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
        )}
        <Input
          id="dropzone-file"
          type="file"
          name="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </Label>
    </form>
  );
}
