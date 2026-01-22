import { useChat } from '../../context/ChatContext'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator';

const ChatMessage = () => {
  const { messages, isStreaming } = useChat();

  return (
    <div className="flex-1 overflow-y-auto space-y-3">
      {messages.map((m)=> (
        <MessageBubble key={m.id} message = {m}/>
      ))}
      {isStreaming && <TypingIndicator/>}
    </div>
  )
}

export default ChatMessage