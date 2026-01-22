import type { Message } from "../../types/chat";
import ReactMarkdown from "react-markdown";
import { useState } from "react";

const MessageBubble = ({ message }: { message: Message }) => {
  const [copied, setCopied] = useState(false);
  const isSystem = message.role === "system";
  const isUser = message.role === "user";
  const timestamp = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isSystem) {
    return (
      <div className="flex justify-center my-4 animate-in fade-in zoom-in duration-300">
        <div className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-[11px] font-medium text-slate-500 dark:text-slate-400 backdrop-blur-sm">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} mb-4 animate-in slide-in-from-bottom-2 duration-300`}>
      <div
        className={`max-w-[85%] md:max-w-[70%] px-4 py-2 rounded-2xl shadow-sm ${
          isUser
            ? "bg-blue-600 text-white rounded-tr-none"
            : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50 border border-slate-200 dark:border-slate-700 rounded-tl-none"
        }`}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none text-sm md:text-base leading-relaxed">
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
              <span className="text-[10px] text-green-600 font-medium transition-colors">
                {copied ? "Copied!" : "Copy"}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
