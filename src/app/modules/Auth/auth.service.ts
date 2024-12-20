import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appError";
import { UserModel } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt from 'jsonwebtoken';
import config from "../../config";


const loginUser = async (payLoad: TLoginUser) => {


    // Check if user exists
    const user = await UserModel.isUserExistsByCustomId(payLoad?.id);

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

    // Check if password match
    if (! await UserModel.isPasswordMatch(payLoad?.password, user?.password)) {
        throw new AppError(
            StatusCodes.FORBIDDEN,
            "Password does not match",
            ''
        );
    };
    

    const JwtPayload = {
        userId: user.id,
        role: user.role,
    };

    // Create jwt access token
    const accessToken = jwt.sign(
        JwtPayload,
        config.jwt_access_secret as string,
        { expiresIn: '10d' }
    );

    return {
        accessToken,
        needPasswrodChange: user.needsPasswordChange,   
    }
};

export const AuthService = {
    loginUser,
};