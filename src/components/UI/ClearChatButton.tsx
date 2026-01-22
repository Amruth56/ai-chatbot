import React from 'react'
import { useChat } from '../../context/ChatContext'

const ClearChatButton = () => {
  const {clearChat} = useChat();

  return (
    <button 
      className='cursor-pointer text-sm px-3 py-1 rounded border transition-colors hover:opacity-80 border-slate-200 dark:border-slate-700'
      onClick={clearChat}
    >
      Clear Chat
    </button>
  )
}

export default ClearChatButton