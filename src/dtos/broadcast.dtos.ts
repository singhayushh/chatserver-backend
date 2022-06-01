import { Document, Schema } from "mongoose";

export interface BroadcastInterface extends Document {
    text: string,
    createdAt: string,
    image: string,
    user: {
        _id: string,
        name: string,
        avatar: string,
    }
};

export interface CreateBroadcastDto {
    text: string,
    createdAt: string,
    image: string,
    user: {
        _id: string,
        name: string,
        avatar: string,
    }
}