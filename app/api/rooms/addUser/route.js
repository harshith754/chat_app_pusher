import { connectToDB } from "@/utils/database";
import Room from "@/models/room";


export const POST = async (req) => {

  const { userName,roomId } =await req.json();

  try {
    await connectToDB(); 
    
    const room = await Room.findById(roomId);

    room.users.push({
      userName: userName,
    });

    await room.save()

    return new Response(JSON.stringify(room), { status: 200} )
    
  } catch (error) {

    return new Response(error, { status: 500} )
  
  }

}