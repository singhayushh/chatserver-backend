import { Request, Response } from "express";
import * as userService from "../services/user.service";

export const Login = async (req: Request, res: Response) => {
    try {
        const { id, name, photo } = req.body;
        //id must be given, for login as well as register
        if (!id) {
            res.status(400).json({ message: `your unique user id is required` });
        }
        const user = await userService.fetchById(id);
        if (user)
            return res.status(202).json({ user, message: "Success" });
        const newUser = await userService.create(id, name, photo);
        return res.status(200).json({ newUser, message: "Success" });
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
        const user = await userService.fetchByStatus(true, req.params.id);
        return res.status(200).json({ user, message: "Success" });
    } catch (err) {
        res.status(500).json({ message: "Server Failure", err });
    }
};

export const FetchInactive = async (req: Request, res: Response) => {
    try {
        const user = await userService.fetchByStatus(false, req.params.id);
        return res.status(200).json({ user, message: "Success" });
    } catch (err) {
        res.status(500).json({ message: "Server Failure", err });
    }
};