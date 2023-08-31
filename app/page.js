"use client"
import { useRouter } from 'next/navigation'
import { useState } from 'react';

export default function Home() {
  const router= useRouter()

  const [userName,setUserName] =useState("")

  const [roomIdInput,setRoomIdInput] =useState("")


  const [creatingRoom,setCreatingRoom]=useState(false);
  const [joiningRoom,setJoiningRoom]=useState(false);



  const createRoom = async (e) => {
    e.preventDefault();

    if(userName===""){
      alert("Username cannot be empty!!")
      return
    }

    setCreatingRoom(true);
    try{
      const response = await fetch('/api/rooms/create',{
        method: 'POST',
        body: JSON.stringify({
          userName:userName
        })
      })

      console.log(response);

      if(response.ok) {
        const newRoom = await response.json();
        console.log(newRoom._id)
        router.push(`/room/${newRoom._id}`)
      }

    } catch(error) {
      console.log(error)
    } finally {
      setCreatingRoom(false)
    }
  }
    

  const joinRoom = async (e) => {

    e.preventDefault();

    if(userName===""){
      alert("Username cannot be empty!!")
      return
    }

    setJoiningRoom(true)

    try{
      const response = await fetch('/api/rooms/addUser',{
        method: 'POST',
        body: JSON.stringify({
          userName:userName,
          roomId:roomIdInput
        })
      })

      console.log(response);

      if(response.ok) {
        const newRoom = await response.json();
        console.log(newRoom._id)
        router.push(`/room/${newRoom._id}`)
      }

    } catch(error) {
      console.log(error)
    } finally {
      setCreatingRoom(false)
    }

    setJoiningRoom(false)

  }

  return (
    <main className="w-full flex flex-col justify-center items-center font-xl">

      <input type='text' className="border
            border-black mt-8 mb-3 rounded-md p-4 text-center" placeholder="Enter user name"
            onChange={({ target }) => (setUserName( target.value) )}
            value={userName}

      >
      </input>

      <button 
        className="border bg-blue-400 border-blue-200 p-3 px-5 rounded-md text-white"
        onClick={createRoom}
      >
        {creatingRoom? 'Creating Room...':'Create Room'}
      </button> 

      <input type='text' className="border
      border-black mt-8 mb-3 rounded-md p-4 text-center" placeholder="roomID"
      onChange={({ target }) => (setRoomIdInput( target.value) )}
      value={roomIdInput}
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
