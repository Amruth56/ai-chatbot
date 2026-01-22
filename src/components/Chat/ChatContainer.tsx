import { useTheme } from '../../context/ThemeContext'
import ConnectionStatus from './ConnectionStatus'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import ThemeToggle from '../UI/ThemeToggle'
import ClearChatButton from '../UI/ClearChatButton'

const ChatContainer = () => {
  const { theme } = useTheme();

  return (
    <div className={`chatbot-container ${theme} flex flex-col h-screen max-w-4xl mx-auto shadow-2xl transition-colors duration-300 overflow-hidden`} style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
      {/* Header */}
      <header 
        className="flex items-center justify-between px-6 py-4 border-b backdrop-blur-md sticky top-0 z-10 transition-colors"
        style={{ backgroundColor: 'var(--header-bg)', borderColor: 'var(--border-color)' }}
      >
        <div className="flex flex-col">
          <h1 className="text-xl font-bold" style={{ color: 'var(--text-color)' }}>AI Chatbot</h1>
          <ConnectionStatus />
        </div>
        <div className="flex items-center gap-3">
          <ClearChatButton />
          <ThemeToggle />
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-hidden flex flex-col relative px-4 py-6 transition-colors" style={{ backgroundColor: 'var(--bg-color)' }}>
        <ChatMessage />
      </main>

      {/* Input Area */}
      <footer 
        className="p-4 border-t backdrop-blur-md transition-colors"
        style={{ backgroundColor: 'var(--header-bg)', borderColor: 'var(--border-color)' }}
      >
        <ChatInput />
      </footer>
    </div>
  )
}

export default ChatContainer