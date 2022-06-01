import { Router } from "express";
import * as broadcastController from "../controllers/broadcast.controller";

const broadcastRouter: Router = Router();

broadcastRouter.post(
    "/",
    broadcastController.Create
);

broadcastRouter.get(
    "/",
    broadcastController.FetchAll
);

export default broadcastRouter;
