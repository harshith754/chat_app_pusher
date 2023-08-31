"use client"
import { useRouter } from 'next/navigation'
import { useState } from 'react';

export default function Home() {
  const router= useRouter()
  let roomIdInput='';

  const [creatingRoom,setCreatingRoom]=useState(false);
  const [joiningRoom,setJoiningRoom]=useState(false);



  const createRoom = async () => {
    setCreatingRoom(true)
    const res = await fetch('/api/rooms/create')

    const roomID= await res.json();

    console.log(roomID)

    router.push(`/room/${roomID}`)
    setCreatingRoom(false)


  }

  const joinRoom = async () => {
    setJoiningRoom(true)
    router.push(`/room/${roomIdInput}`)
    setJoiningRoom(false)

  }

  return (
    <main className="w-full flex flex-col justify-center items-center font-xl">
      <button 
        className="border bg-blue-400 border-blue-200 p-3 px-5 rounded-md text-white"
        onClick={createRoom}
      >
        {creatingRoom? 'Creating Room...':'Create Room'}
      </button> 

      <input type='text' className="border
      border-black mt-8 mb-3 rounded-md p-4 text-center" placeholder="roomID"
      onChange={({ target }) => (roomIdInput = target.value)}

      >
      </input>
      <button 
        className="border bg-blue-400 border-blue-200 p-3 px-5 rounded-md text-white"
        onClick={joinRoom}
      >
        {joiningRoom? 'Joining Room...':'Join Room'}
      </button> 
    </main>
  )
}
