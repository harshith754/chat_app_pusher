import { connectToDB } from "@/utils/database";
import Room from "@/models/room";


export const POST = async (req) => {

  const { userName } =await req.json();

  try {
    await connectToDB(); 
    
    const newRoom = new Room({
      messages: [] ,
      users: [
        {
          userName: userName , // Replace with the actual username
        }
      ]
    });

    await newRoom.save()

    return new Response(JSON.stringify(newRoom), { status: 200} )
    
  } catch (error) {

    return new Response(error, { status: 500} )
  
  }

}