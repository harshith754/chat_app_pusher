import ChatField from "@/components/ChatField";
import Chats from "@/components/Chats";
import Message from "@/models/message"
import { connectToDB } from "@/utils/database";

const page =async ({params}) => {
  const roomId=params.roomId;

  await connectToDB()

  const existingMessages = await Message.find({ roomId: roomId }); 
  
  const mappedMessages = existingMessages.map(message => ({
    id: message._id.toString(),
    text: message.text
  }));

  return (
    <div className="flex flex-col justify-center items-center">
      In room {roomId}

      <Chats roomId={roomId} existingMessages={mappedMessages} />
      <ChatField roomId={roomId}/>
    </div>
  )
}

export default page
