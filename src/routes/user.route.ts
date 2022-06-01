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
    "/active",
    userController.FetchActive
);

userRouter.get(
    "/inactive",
    userController.FetchInactive
);

export default userRouter;
