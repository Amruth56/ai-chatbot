import React from 'react'

const TypingIndicator = () => {
  return (
<div className="flex space-x-1 items-center text-sm text-gray-500 italic">
      <span className="animate-bounce">Typing•</span>
      <span className="animate-bounce delay-150">•</span>
      <span className="animate-bounce delay-300">•</span>
      <span className="animate-bounce delay-300">•</span>
    </div>
  )
}

export default TypingIndicator