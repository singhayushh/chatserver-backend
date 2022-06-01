import { Request, Response, Router } from "express";

import broadcastRouter from "./broadcast.route";
import chatRouter from "./chat.route";
import userRouter from "./user.route";

const mainRouter: Router = Router();

mainRouter.use("/broadcast", broadcastRouter);
mainRouter.use("/chat", chatRouter);
mainRouter.use("/user", userRouter);

mainRouter.use((req: Request, res: Response) => {
    res.status(404);
});

export default mainRouter;
