import { Schema,model,models } from "mongoose";

const MessageSchema = new Schema({

  roomId:{
    type:String,
    required:[true]
  },
  text:{
    type:String,
    required:[true]
  }
  
});

const Message = models.Message ||  model("Message", MessageSchema);

export default Message;