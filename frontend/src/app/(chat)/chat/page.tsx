import React from "react";
import Sidebar from "./_components/Sidebar";
import Preview from "./_components/Preview";

export default function ChatDashboard() {
  return (
    <div className="max-h-screen overflow-hidden bg-stone-900 flex w-full max-w-screen">
      <Sidebar />
      <div className="flex-1 flex ml-4">
        <div className="w-1/2  bg-zinc-800  rounded-lg border-r border-gray-700 overflow-hidden">
          <Preview id="39" />
        </div>
      </div>
    </div>
  );
}
