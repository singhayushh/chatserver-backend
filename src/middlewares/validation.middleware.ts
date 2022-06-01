import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const ValidationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ "message": "Required Fields were not passed", errors: errors.array() });
    }

    next();
};
