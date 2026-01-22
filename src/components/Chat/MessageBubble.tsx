import React from "react";
import type { Message } from "../../types/chat";
import ReactMarkdown from "react-markdown";
import { copyToClipBoard } from "../../utils/clipboard";

const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.role === "user";

  const copyButton = () => {
    copyToClipBoard(message.content);
  };
  return (
    <div
      className={`p-3 rounded ${isUser ? "bg-blue-500 text-white ml-auto" : "bg-gray-200 dark:bg-gray-700"}`}
    >
      <ReactMarkdown>{message.content}</ReactMarkdown>
      {isUser && (
        <button className="text-xs mt-1 underline" onClick={copyButton}>
          Copy
        </button>
      )}
    </div>
  );
};

export default MessageBubble;
