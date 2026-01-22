import { useState, useRef, useEffect } from 'react'
import { useChat } from '../../context/ChatContext'

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
          className="w-full p-3 pr-12 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none shadow-sm overflow-hidden"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            backgroundColor: 'var(--input-bg)',
            color: 'var(--text-color)',
            border: '2px solid var(--border-color)'
          }}
        />
        <div className="absolute right-4 bottom-3 text-[10px] text-gray-400 select-none font-medium">
          {text.length}/1000
        </div>
      </div>
      
      <button
        type="submit"
        disabled={!text.trim() || isStreaming}
        className="p-4 cursor-pointer"
        aria-label="Send message"
      >
        Send
      </button>
    </form>
  )
}

export default ChatInput