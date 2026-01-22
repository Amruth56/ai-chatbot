import { useChat } from '../../context/useChat'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator';
import { useAutoScroll } from "../../hooks/useAutoScroll";



const ChatMessage = () => {
  const { messages, isStreaming } = useChat();
  const scrollRef = useAutoScroll<HTMLDivElement>();


  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3">
      {messages.map((m)=> (
        <MessageBubble key={m.id} message = {m}/>
      ))}
      {isStreaming && <TypingIndicator/>}
    </div>
  )
}

export default ChatMessage