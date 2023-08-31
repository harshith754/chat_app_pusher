import { connectToDB } from "@/utils/database";
import Room from "@/models/room";

export const GET = async (req) => {

  try {
    await connectToDB();  //need to connect every time since its lambda function(will die after finishing job)
    
    const newRoom = await Room.create({
      messages: [] 
    });

    console.log(newRoom)

    return new Response(JSON.stringify(newRoom._id), { status: 200} )
    
  } catch (error) {

    return new Response(error, { status: 500} )
  
  }
}