import { Schema,model,models } from "mongoose";

const RoomSchema = new Schema({
 
  messages: [{
    type: Schema.Types.ObjectId,
    ref:'Message',
  }],
  users: [
    {
      userName: {
        type: String,
        required: true,
      },
    },
  ],
  },{
  timestamps: true,
  }
);

const Room = models.Room ||  model("Room", RoomSchema);

export default Room;