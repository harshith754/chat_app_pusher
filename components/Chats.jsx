'use client'

import { pusherClient } from '@/pusher/pusher'
import { useEffect, useState } from 'react'

const Chats =  ( {roomId, existingMessages} ) => {

  const [incomingMessages, setIncomingMessages] = useState([])

  useEffect(() => {

    if(!pusherClient) console.log("NO PUSHER CLIENT")
    pusherClient.subscribe(roomId)

    pusherClient.bind('incoming-message', (text) => {
      setIncomingMessages((prev) => [...prev, text])
    })

    return () => {
      pusherClient.unsubscribe(roomId)
    }
  }, [])

  return (
    <div className='border border-black p-10 w-[60%] my-5 rounded-md'>
      {existingMessages.map((message) => (
        <p key={message.id}>{message.text}</p>
      ))}


      {incomingMessages.map((text, i) => (
        <p key={i}>{text}</p>
      ))}
    </div>
  )
}

export default Chats
