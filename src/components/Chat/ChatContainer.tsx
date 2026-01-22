import { useTheme } from '../../context/ThemeContext'
import ConnectionStatus from './ConnectionStatus'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import ThemeToggle from '../UI/ThemeToggle'
import ClearChatButton from '../UI/ClearChatButton'

const ChatContainer = () => {
  const { theme } = useTheme();

  return (
    <div className={`${theme} flex flex-col h-screen max-w-4xl mx-auto shadow-2xl transition-colors duration-300 overflow-hidden bg-white text-slate-900 border-x border-slate-100 dark:bg-[#0f172a] dark:text-slate-50 dark:border-slate-800`}>
      <header className="flex items-center justify-between px-6 py-4 border-b backdrop-blur-md sticky top-0 z-10 transition-colors bg-white/80 dark:bg-[#1e293b]/80 border-slate-100 dark:border-slate-800">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">AI Chatbot</h1>
          <ConnectionStatus />
        </div>
        <div className="flex items-center gap-3">
          <ClearChatButton />
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 overflow-hidden flex flex-col relative px-4 py-6 transition-colors bg-white dark:bg-[#0f172a]">
        <ChatMessage />
      </main>

      <footer className="p-4 border-t backdrop-blur-md transition-colors bg-white/80 dark:bg-[#1e293b]/80 border-slate-100 dark:border-slate-800">
        <ChatInput />
      </footer>
    </div>
  )
}

export default ChatContainer