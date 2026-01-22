import React from 'react'
import { useChat } from '../../context/ChatContext'

const ClearChatButton = () => {
  const {clearChat} = useChat();

  return (
    <div>
      <button className='cursor-pointer text-sm px-3 py-1 rounded border hover:bg-gray-100 dark:hover:bg-gray-700'
      onClick={clearChat}
      >
        Clear Chat
      </button>
    </div>
  )
}

export default ClearChatButton