import { Request, Response } from "express";
import * as chatService from "../services/chat.service";

export const NewChat = async (req: Request, res: Response) => {
    try {
        const { sender, receiver, messages } = req.body;
        let chat = await chatService.fetchChatByUser(sender, receiver);
        if (!chat) {
            chat = await chatService.create(sender, receiver, messages);
            return res.status(200).json({ message: "Success", chat });
        } else {
            const updatedChat = await chatService.update(sender, receiver, messages);
            return res.status(200).json({ message: "Success", updatedChat });
        }
    } catch (err) {
        res.status(500).json({ message: "Server Failure", err });
    }
};

export const FetchMessages = async (req: Request, res: Response) => {
    try {
        const { sender, receiver } = req.params;
        const chat = await chatService.fetchChatByUser(sender, receiver);
        if (!chat) return res.status(400).json({ message: "Invalid sender or receiver"});
        return res.status(200).json({ message: "Success", chats: chat.messages });
    } catch (err) {
        res.status(500).json({ message: "Server Failure", err });
    }
};

export const FetchChats = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;
        const chats = await chatService.fetchChatsOfUser(user_id);
        return res.status(200).json({ message: "Success", chats: chats });
    } catch (err) {
        res.status(500).json({ message: "Server Failure", err });
    }
};