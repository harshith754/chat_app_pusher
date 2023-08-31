'use client'
import { useState } from 'react'



const ChatField= ({ roomId }) => {
  const [input,setInput] = useState('');

  const [sending,setSending]=useState(false)

  const sendMessage = async (text) => {
    setSending(true);

    const response = await fetch('/api/message',{
      method: 'POST',
      body: JSON.stringify({
        text:input,
        roomId
      })
    })

    console.log(response);

    setInput('')

    setSending(false);
  }

  return (
    <div className='flex gap-2 flex-row items-center '>
      Type a new message:
      <input
        value={input}
        onChange={(e) => (setInput(e.target.value))}
        className='border border-zinc-300 rounded-md'
        type='text'
      />
      <button 
        onClick={(e) => sendMessage(input || '')}
        className='bg-blue-400 text-white p-1 px-4 rounded-lg hover:bg-blue-600'  
      >
        
        {sending? "sending..." :" send"}</button>
    </div>
  )
}

export default ChatField