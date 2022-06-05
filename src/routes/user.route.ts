import { Router } from "express";
import * as userController from "../controllers/user.controller";

const userRouter: Router = Router();

userRouter.post(
    "/login",
    userController.Login
);

userRouter.get(
    "/find/:id",
    userController.FetchById
);

userRouter.get(
    "/active/:id",
    userController.FetchActive
);

userRouter.get(
    "/inactive/:id",
    userController.FetchInactive
);

export default userRouter;
