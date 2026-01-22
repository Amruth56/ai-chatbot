import React, {useState} from 'react'
import { useChat } from '../../context/ChatContext';

const ChatInput = () => {
  const [text, setText] = useState("");
  const {sendMessage, isStreaming} = useChat();

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(text);
    setText("");
  }
  return (
    <>
    <form
    onSubmit = {formSubmit}>
      <input
      value = {text}
      onChange={(e) => setText(e.target.value)}
      disabled={isStreaming}
      placeholder='Ask me anything'
      className='border flex-1 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <button
      type='submit'
      disabled={!text.trim() || isStreaming}
      className='bg-blue-500 text-white p-2 rounded-md'
      >
        Send
      </button>

    </form>
    </>
  )
}

export default ChatInput