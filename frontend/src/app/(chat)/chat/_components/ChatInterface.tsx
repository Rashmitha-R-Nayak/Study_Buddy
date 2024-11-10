"use client";
import React, { useState, useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { fetchWithAuth } from "@/lib/api";
import { LoadingDots } from "@/components/loading_indicators/Loading";

interface ChatHistoryItem {
  question: string;
  response: string;
  created_at: string; // timestamp to help with ordering
}

function formatAnswer(text: string): string {
  let formattedText = text.replace(
    /\*\*(.*?)\*\*/g,
    (_, content) => `<strong>${content}</strong>`
  );
  formattedText = formattedText.replace(
    /\*(.*?)\*/g,
    (_, content) => `<em>${content}</em>`
  );
  formattedText = formattedText.replace(
    /`(.*?)`/g,
    (_, content) => `<code>${content}</code>`
  );
  formattedText = formattedText.replace(
    /```(\w+)?\n([\s\S]*?)\n```/g,
    (_, lang = "plaintext", code) =>
      `<pre><code class="${lang}">${escapeHtml(code)}</code></pre>`
  );
  formattedText = formattedText.replace(/\n/g, "<br>");
  return formattedText;
}

function escapeHtml(text: string): string {
  const escapeMap: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return text.replace(/[&<>"']/g, (char) => escapeMap[char]);
}

function highlightCode(html: string): string {
  return html.replace(
    /<pre><code class='(\w+)'>([\s\S]*?)<\/code><\/pre>/g,
    (_, language, code) => {
      const languageToHighlight = hljs.getLanguage(language)
        ? language
        : "plaintext";
      const highlightedCode = hljs.highlight(code, {
        language: languageToHighlight,
      }).value;
      return `<pre><code class="${languageToHighlight}">${highlightedCode}</code></pre>`;
    }
  );
}

export default function ChatInterface({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<ChatHistoryItem[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

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

      setIsLoading(false);
    } catch (error) {
      console.log("Failed to submit question");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
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

      <form
        onSubmit={handleSubmit}
        className="mt-4 flex items-center border-t border-gray-600 pt-4 mb-16"
      >
        <input
          name="question"
          type="text"
          placeholder="Type a question..."
          className="flex-1 p-2 rounded-lg bg-gray-700 text-white focus:outline-none mr-2"
          required
        />
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
