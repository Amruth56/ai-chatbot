import { useChat } from '../../context/useChat'

const ConnectionStatus = () => {
  const { connected } = useChat();
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${connected ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
        {connected ? "Connected" : "Disconnected"}
      </span>
    </div>
  )
}

export default ConnectionStatus