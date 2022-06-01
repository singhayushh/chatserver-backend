import { Document, Schema } from "mongoose";

export interface ChatInterface extends Document {
    sender: Schema.Types.ObjectId,
    receiver: Schema.Types.ObjectId,
    messages: [
        {
            text: string,
            createdAt: string,
            image: string,
        }
    ],
    user: {
        _id: string,
        name: string,
        avatar: string,
    }
};

export interface Message {
    text: string,
    createdAt?: string,
    image: string,
};