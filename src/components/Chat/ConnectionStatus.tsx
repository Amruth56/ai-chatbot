import React from 'react'
import { useChat } from '../../context/ChatContext'

const ConnectionStatus = () => {
  const {connected} = useChat();
  return (
    <div className='text-sm text-gray-500 mb-2'>
      Status: {connected ? "Connected" : "Disconnected"}
    </div>
  )
}

export default ConnectionStatus