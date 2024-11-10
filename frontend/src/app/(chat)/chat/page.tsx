import React from "react";
import Sidebar from "./_components/Sidebar";
import Preview from "./_components/Preview";
import ChatInterface from "./_components/ChatInterface";

export default function ChatDashboard() {
  return (
    <div className="h-screen max-h-screen overflow-hidden bg-zinc-900 flex w-full max-w-screen">
      <Sidebar />
      <div className="flex-1 flex ml-2 space-x-4 px-2">
        <div className="w-1/2 bg-zinc-800 rounded-lg border border-gray-700 shadow-lg overflow-hidden">
          <Preview id="1" />
        </div>
        <div className="w-1/2 bg-zinc-800 rounded-lg border border-gray-700 p-4 shadow-lg text-white h-full overflow-hidden">
          <ChatInterface id="1" />
        </div>
      </div>
    </div>
  );
}
