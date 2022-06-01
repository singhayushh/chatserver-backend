import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { fetchById } from "../services/user.service";
import { jwtPayloadDto } from "../dtos/user.dtos";

export const Auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token)
            return res.status(401).json({ "message": "No token, authorization failed" });

        const decoded = jwt.verify(
            token,
            String(process.env.JWT_SECRET)
        ) as jwtPayloadDto;

        if (!decoded)
            return res.status(401).json({ "message": "Expired or invalid token" });

        const user = await fetchById(decoded.user.id);
        if (!user)
            return res.status(401).json({ "message": "Invalid user correspondence" });

        req.body.user = user;

        next();
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ "message": error.message });
    }
};
