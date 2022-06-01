import { model, Model, Schema } from "mongoose";
import { BroadcastInterface } from "../dtos/broadcast.dtos";

const broadcastSchema: Schema<BroadcastInterface> = new Schema(
    {
        text: String, //message_content
        createdAt: String, //message_creation_time
        image: String, //message_image_content
        user: {
            _id: String, //sender_id
            name: String, //sender_name
            avatar: String //sender_photo
        },
    },
    {
        timestamps: true,
        strict: false //There may be some problems in type casting. So disable strict mode.
    }
);

const Broadcast: Model<BroadcastInterface> = model("Broadcast", broadcastSchema);

export default Broadcast;