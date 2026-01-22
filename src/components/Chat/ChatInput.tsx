import { useState, useRef, useEffect } from 'react'
import { useChat } from '../../context/ChatContext';

const ChatInput = () => {
  const [text, setText] = useState("");
  const { sendMessage, isStreaming } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (text.trim() && !isStreaming) {
      sendMessage(text);
      setText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [text]);

  return (
    <form onSubmit={handleSubmit} className="relative flex items-end gap-2 max-w-4xl mx-auto">
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isStreaming}
          placeholder={isStreaming ? "AI is thinking..." : "Ask me anything..."}
          rows={1}
          className="w-full p-3 pr-12 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none shadow-sm dark:text-white disabled:opacity-50"
        />
        <div className="absolute right-3 bottom-3 text-[10px] text-gray-400 select-none">
          {text.length}/1000
        </div>
      </div>
      
      <button
        type="submit"
        disabled={!text.trim() || isStreaming}
        className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-xl shadow-md transition-all flex-shrink-0"
        aria-label="Send message"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      </button>
    </form>
  )
}

export default ChatInput