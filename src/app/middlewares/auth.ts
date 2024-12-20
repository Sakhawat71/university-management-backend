import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/appError";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";


const authValidation = (...requiredRoles: TUserRole[]) => {
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
        const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;






        
        if (requiredRoles && !requiredRoles.includes(decoded?.role)) {
            throw new AppError(
                StatusCodes.UNAUTHORIZED,
                "You are not authorized",
                ''
            )
        };

        req.user = decoded as JwtPayload;
        next()
    })
};
export default authValidation;