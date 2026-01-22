import React from 'react'
import ConnectionStatus from './ConnectionStatus'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'

const ChatContainer = () => {
  return (
    <div>
        <ConnectionStatus/>
        <ChatMessage/>
        <ChatInput/>
    </div>
  )
}

export default ChatContainer