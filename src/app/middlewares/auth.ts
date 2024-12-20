import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/appError";
import { StatusCodes } from "http-status-codes";

const authValidation = () => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        if(!token) {
            throw new AppError(
                StatusCodes.UNAUTHORIZED,
                "Unauthorized",
                ''
            );
        };
        next();
    })
};
export default authValidation;