"use client";
import React, { useState, useEffect, useRef } from "react";
import { fetchWithAuth } from "@/lib/api";
import { LoadingDots } from "@/components/loading_indicators/Loading";
import { SUGGESTION_QUESTIONS } from "@/app/constants/Constant";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { formatAnswer, highlightCode } from "@/lib/FormatResponse";

interface ChatHistoryItem {
  question: string;
  response: string;
  created_at: string; // timestamp to help with ordering
}

export default function ChatInterface({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<ChatHistoryItem[]>([]);
  const [suggestions, setSuggestions] =
    useState<string[]>(SUGGESTION_QUESTIONS);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const res = await fetchWithAuth(`/pdfs/${id}/chats/`);
        if (!res.ok) {
          console.log("Failed to fetch chat history");
          return;
        }
        const data = await res.json();
        const formattedHistory = data.map((item: any) => ({
          question: item.question,
          response: highlightCode(formatAnswer(item.response)),
          created_at: item.created_at,
        }));
        setHistory(formattedHistory);
      } catch (error) {
        console.log("Error fetching chat history");
      }
    };

    fetchChatHistory();
  }, [id]);

  useEffect(() => {
    // Scroll to the bottom when the history is updated
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const submittedQuestion = formData.get("question") as string;

    try {
      const res = await fetchWithAuth(`/pdfs/${id}/chat/`, {
        method: "POST",
        body: JSON.stringify({ question: submittedQuestion }),
      });
      if (!res.ok) {
        console.log("Error occurred while submitting the question");
      }
      const data = await res.json();
      const formattedAnswer = formatAnswer(data.response);
      const highlightedAnswer = highlightCode(formattedAnswer);

      setHistory((prevHistory) => [
        ...prevHistory,
        {
          question: submittedQuestion,
          response: highlightedAnswer,
          created_at: new Date().toISOString(),
        },
      ]);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Failed to submit question");
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    const questionInput = document.querySelector(
      'input[name="question"]'
    ) as HTMLInputElement;
    if (questionInput) {
      questionInput.value = suggestion;
    }
  };

  const toggleSuggestions = () => {
    setShowSuggestions((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-full rounded-2xl">
      <div
        className="flex-1 overflow-y-auto space-y-4 p-4 bg-zinc-800 rounded-lg"
        ref={chatContainerRef}
      >
        {history.length === 0 ? (
          <p className="text-gray-400">No questions asked yet.</p>
        ) : (
          history.map((item, index) => (
            <div key={index}>
              <div className="p-3 rounded-lg bg-blue-500 text-white self-end mb-2">
                {item.question}
              </div>
              <div className="p-3 rounded-lg bg-gray-700 text-white self-start">
                <div
                  className="chat-response"
                  dangerouslySetInnerHTML={{ __html: item.response }}
                />
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="p-3 rounded-lg bg-gray-700 text-white self-center">
            <LoadingDots />
          </div>
        )}
      </div>

      {showSuggestions && (
        <div className="my-2">
          <h3 className="text-white p-2"></h3>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left p-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-4 flex items-center border-t border-gray-600 pt-4 mb-16 relative"
      >
        <div className="flex-1 relative">
          <input
            name="question"
            type="text"
            placeholder="Type a question..."
            className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none mr-2 pl-4"
            ref={inputRef}
            required
          />

          <button
            onClick={toggleSuggestions}
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white"
            aria-label={
              showSuggestions ? "Hide suggestions" : "Show suggestions"
            }
          >
            {showSuggestions ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </button>
        </div>

        <button
          type="submit"
          className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
