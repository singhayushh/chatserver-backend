import { model, Model, Schema } from "mongoose";
import { ChatInterface } from "../dtos/chat.dtos";

const chatSchema: Schema<ChatInterface> = new Schema(
    {
        sender: Schema.Types.ObjectId, //sender_id
        receiver: Schema.Types.ObjectId, //reciever_id
        messages: [
            {
                text: String, //message_content
                createdAt: String, //message_creation_time
                image: String, //message_image_content
                user: {
                    _id: String, //sender_id
                    name: String, //sender_name
                    avatar: String //sender_photo
                  },
            }
        ]
    },
    {
        timestamps: true,
        strict: false //There may be some problems in type casting. So disable strict mode.
    },
);

const Chat: Model<ChatInterface> = model("Chat", chatSchema);

export default Chat;