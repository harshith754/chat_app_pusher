import { pusherServer } from '@/pusher/pusher'
import Room from "@/models/room";
import Message from "@/models/message";



export async function POST(req) {
  const { text, roomId } = await req.json()

  try{
    

   await pusherServer.trigger(roomId, 'incoming-message', text)
  }
  catch(e){
    return new Response(e.message, { status: 500} )

  }
  
  try{
    const room = await Room.findById(roomId)

    if (!room) {
      return new Response(JSON.stringify({ success: false, message: 'Room not found' }));
    }
    
    const newMessage = new Message({
      roomId: roomId,
      text: text,
    });

    await newMessage.save();

    room.messages.push(newMessage._id); // Assuming you're storing message IDs in the array

    
    await room.save();

  }
  catch(e){
    return new Response("Failed to create a new prompt", { status: 500} )
  }
 

  return new Response(JSON.stringify({ success: true }))
}
