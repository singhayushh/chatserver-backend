import { Request, Response } from "express";
import { CreateBroadcastDto } from "../dtos/broadcast.dtos";
import * as broadcastService from "../services/broadcast.service";

export const FetchAll = async (req: Request, res: Response) => {
    try {
        const broadcasts = await broadcastService.fetchAll();
        return res.status(200).json({ message: "Success", broadcasts: broadcasts });
    } catch (err) {
        res.status(500).json({ message: "Server Failure", err });
    }
};

export const Create = async (req: Request, res: Response) => {
    try {
        const dto: CreateBroadcastDto = { ...req.body };
        let broadcast = await broadcastService.create(dto);
        return res.status(200).json({ message: "Success", broadcast });
    } catch (err) {
        res.status(500).json({ message: "Server Failure", err });
    }
};