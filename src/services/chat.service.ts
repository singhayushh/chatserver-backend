import { Message } from "../dtos/chat.dtos";
import Chat from "../models/chat.model";

export const fetchChatByUser = async (sender: string, receiver: string) => {
    return await Chat.findOne({
        $or: [
            {
                receiver: receiver,
                sender: sender
            },
            {
                receiver: sender,
                sender: receiver
            },
        ],
    });
};

export const fetchChatsOfUser = async (user_id: string) => {
    return await Chat.find({
        $or: [
            {
                sender: user_id
            },
            {
                receiver: user_id,
            },
        ],
    });
};

export const create = async (sender: string, receiver: string, messages: Message[]) => {
    let chat = new Chat({
        sender: sender,
        reciever: receiver,
        messages: messages,
    });
    return await chat.save();
};

export const update = async (sender: string, receiver: string, messages: Message[]) => {
    const updatedChat = await Chat.updateOne(
        {
            $or: [
                {
                    receiver: receiver,
                    sender: sender
                },
                {
                    receiver: sender,
                    sender: receiver
                },
            ],
        },
        { $set: { messages: messages } }
    );

    return updatedChat;
};