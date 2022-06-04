import { Request, Response, Router } from "express";

import broadcastRouter from "./broadcast.route";
import chatRouter from "./chat.route";
import userRouter from "./user.route";

const mainRouter: Router = Router();

mainRouter.use("/broadcast", broadcastRouter);
mainRouter.use("/chat", chatRouter);
mainRouter.use("/user", userRouter);

mainRouter.use((_: Request, res: Response) => {
    res.status(404).send("Not Found");
});

export default mainRouter;
