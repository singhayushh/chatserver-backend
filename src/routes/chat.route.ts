import { Router } from "express";
import * as chatController from "../controllers/chat.controller";

const chatRouter: Router = Router();

chatRouter.post(
    "/",
    chatController.NewChat
);

chatRouter.get(
    "/chats/:id",
    chatController.FetchChats
);

chatRouter.get(
    "/messages/:sender/:receiver",
    chatController.FetchMessages
);

export default chatRouter;