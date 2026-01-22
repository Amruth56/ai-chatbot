import React from 'react'
import { useChat } from '../../context/ChatContext'

const ClearChatButton = () => {
  const {clearChat} = useChat();

  return (
    <button 
      className='cursor-pointer text-sm px-3 py-1 rounded border transition-colors hover:opacity-80'
      style={{ borderColor: 'var(--border-color)' }}
      onClick={clearChat}
    >
      Clear Chat
    </button>
  )
}

export default ClearChatButton