import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/appError";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config";


const authValidation = () => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;

        // if the token sent from the client
        if (!token) {
            throw new AppError(
                StatusCodes.UNAUTHORIZED,
                "Unauthorized",
                ''
            );
        };

        // check if the token is valid
        jwt.verify(
            token,
            config.jwt_access_secret as string,
            function (err, decoded) {
                if (err) {
                    throw new AppError(
                        StatusCodes.UNAUTHORIZED,
                        "Unauthorized",
                        ''
                    )
                };

                // const { userId, role } = decoded;
                req.user = decoded as JwtPayload;
                next()
            }
        );

        // next();
    })
};
export default authValidation;