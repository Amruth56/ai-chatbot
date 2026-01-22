import type { Message } from "../../types/chat";
import ReactMarkdown from "react-markdown";
import { useState } from "react";

const MessageBubble = ({ message }: { message: Message }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";
  const timestamp = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} mb-4`}>
      <div
        className={`max-w-[85%] md:max-w-[70%] px-4 py-2 rounded-2xl shadow-sm ${
          isUser
            ? "bg-blue-600 text-white rounded-tr-none"
            : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50 border border-slate-200 dark:border-slate-700 rounded-tl-none"
        }`}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
        
        <div className={`flex items-center gap-2 mt-1 ${isUser ? "justify-end text-blue-100" : "justify-start text-gray-500"}`}>
          <span className="text-[10px] opacity-70">{timestamp}</span>
          {!isUser && (
            <button 
              onClick={handleCopy}
              className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Copy to clipboard"
            >
              {copied ? (
                <>
                  <span className="text-[10px] font-medium text-green-600 dark:text-green-400">Message copied</span>
                 
                </>
              ) : (
                <>
                  <span className="text-[10px] font-medium text-blue-600 dark:text-blue-400">copy message</span>
                 
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
