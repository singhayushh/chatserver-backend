import { Router } from "express";
import * as chatController from "../controllers/chat.controller";

const chatRouter: Router = Router();

chatRouter.post(
    "/",
    chatController.NewChat
);

chatRouter.get(
    "/:sender/:receiver",
    chatController.FetchMessages
);

chatRouter.get(
    "/:id",
    chatController.FetchChats
);

export default chatRouter;