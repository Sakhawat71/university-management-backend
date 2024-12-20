import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/appError";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";
import { UserModel } from "../modules/user/user.model";


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


        const user = await UserModel.isUserExistsByCustomId(decoded.userId);
        if (!user) {
            throw new AppError(
                StatusCodes.NOT_FOUND,
                "User not found",
                ''
            );
        };

        // Check if user is deleted
        if (user.isDeleted) {
            throw new AppError(
                StatusCodes.BAD_REQUEST,
                "User is deleted",
                ''
            );
        };

        // Check if user is blocked
        if (user.status === 'blocked') {
            throw new AppError(
                StatusCodes.BAD_REQUEST,
                "User is bloack",
                ''
            );
        };


        if(user.passwordChangedAt && UserModel.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt,decoded.iat as number)){
            throw new AppError(StatusCodes.UNAUTHORIZED,'You Are not Authorize','')
        }

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