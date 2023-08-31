import { Schema,model,models } from "mongoose";

const RoomSchema = new Schema({
 
  messages: [{
    type: Schema.Types.ObjectId,
    ref:'Message',
  }],
},{
  timestamps: true,
});

const Room = models.Room ||  model("Room", RoomSchema);

export default Room;