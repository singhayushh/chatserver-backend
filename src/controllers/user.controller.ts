import { Request, Response } from "express";
import * as userService from "../services/user.service";

export const Login = async (req: Request, res: Response) => {
    try {
        const { id, name, photo } = req.body;
        if (id) {
            const user = userService.fetchById(id);
            if (!user)
                return res.status(400).json({ message: "Invalid user id" });
            return res.status(202).json({ user, message: "Success" });
        } else if (!name) {
            res.status(400).json({ message: `name is required` });
        } else {
            let user = await userService.fetchByName(name);
            if (user)
                return res.status(202).json({ user, message: "Success" });
            user = await userService.create(name, photo);
            return res.status(200).json({ user, message: "Success" });
        }
    } catch (err) {
        res.status(500).json({ message: "Server Failure", err });
    }
};

export const FetchById = async (req: Request, res: Response) => {
    try {
        const user = await userService.fetchById(req.params.id);
        return res.status(200).json({ user, message: "Success" });
    } catch (err) {
        res.status(500).json({ message: "Server Failure", err });
    }
};

export const FetchActive = async (req: Request, res: Response) => {
    try {
        const user = await userService.fetchByStatus(true);
        return res.status(200).json({ user, message: "Success" });
    } catch (err) {
        res.status(500).json({ message: "Server Failure", err });
    }
};

export const FetchInactive = async (req: Request, res: Response) => {
    try {
        const user = await userService.fetchByStatus(false);
        return res.status(200).json({ user, message: "Success" });
    } catch (err) {
        res.status(500).json({ message: "Server Failure", err });
    }
};