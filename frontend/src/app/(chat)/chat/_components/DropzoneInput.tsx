"use client";
import React, { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/loading_indicators/Loading";
import { fetchWithAuth } from "@/lib/api";
import { useCheckLogin } from "@/lib/userCheckLogin";

export function DropZoneInput({
  onUploadSuccess,
}: {
  onUploadSuccess: () => void;
}) {
  const [fileName, setFileName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useCheckLogin();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  const handleFileUpload = async (event: React.FormEvent<HTMLFormElement>) => {
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
      if (!response.ok) {
        throw new Error("Upload failed");
      }
      await response.json();
      onUploadSuccess();
      setFileName("");
    } catch (error) {
      console.log("Error occurred while uploading the file:");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleFileUpload}
      className="flex flex-col items-center justify-center gap-4 w-11/12 max-w-md h-auto bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-lg"
    >
      <Label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-32 transition-transform duration-300 ease-in-out hover:scale-105 border-2 rounded-lg cursor-pointer hover:bg-gray-800 bg-gray-900 border-gray-600 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
      >
        <div className="flex flex-col items-center justify-center pt-4 pb-6 text-center">
          <svg
            className="w-8 h-8 mb-2 text-gray-400"
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
          <p className="mb-2 text-sm text-gray-400">
            {fileName ? (
              <span className="text-gray-200 font-medium">{fileName}</span>
            ) : (
              <>
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </>
            )}
          </p>
        </div>
        <Input
          id="dropzone-file"
          type="file"
          name="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </Label>

      {fileName && (
        <Button
          type="submit"
          disabled={isLoading}
          className={`w-full mt-2 transition duration-300 ${
            isLoading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white rounded-lg px-4 py-2`}
        >
          {isLoading ? <LoadingSpinner /> : "Upload"}
        </Button>
      )}
    </form>
  );
}
