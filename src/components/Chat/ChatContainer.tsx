import ConnectionStatus from './ConnectionStatus'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import ThemeToggle from '../UI/ThemeToggle'
import ClearChatButton from '../UI/ClearChatButton'

const ChatContainer = () => {
  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-xl transition-colors duration-300">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-md sticky top-0 z-10">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">AI Chatbot</h1>
          <ConnectionStatus />
        </div>
        <div className="flex items-center gap-3">
          <ClearChatButton />
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 overflow-hidden flex flex-col relative px-4 py-6">
        <ChatMessage />
      </main>

      <footer className="p-4 bg-gray-50/50 dark:bg-gray-800/50 border-t dark:border-gray-800 backdrop-blur-md">
        <ChatInput />
      </footer>
    </div>
  )
}

export default ChatContainer