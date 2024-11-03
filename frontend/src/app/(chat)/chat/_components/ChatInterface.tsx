import React from "react";

export default function ChatInterface() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-zinc-800 rounded-lg">
        <div className="p-3 rounded-lg bg-blue-500 text-white self-end">
          Question
        </div>

        <div className="p-3 rounded-lg bg-gray-700 text-white self-start">
          Response
        </div>
      </div>

      <div className="mt-4 flex items-center border-t border-gray-600 pt-4 mb-16">
        <input
          type="text"
          placeholder="Type a question..."
          className="flex-1 p-2 rounded-lg bg-gray-700 text-white focus:outline-none mr-2"
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
          Send
        </button>
      </div>
    </div>
  );
}
