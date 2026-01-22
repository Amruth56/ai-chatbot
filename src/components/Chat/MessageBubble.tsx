import type { Message } from "../../types/chat";
import ReactMarkdown from "react-markdown";
import { copyToClipBoard } from "../../utils/clipboard";

const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.role === "user";
  const timestamp = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleCopy = () => {
    copyToClipBoard(message.content);
  };

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} mb-4`}>
      <div
        className={`max-w-[85%] md:max-w-[70%] px-4 py-2 rounded-2xl shadow-sm ${
          isUser
            ? "bg-blue-600 text-white rounded-tr-none"
            : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-tl-none"
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
              className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors"
              title="Copy to clipboard"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
