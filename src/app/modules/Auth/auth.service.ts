import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appError";
import { UserModel } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt from 'jsonwebtoken';


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
    // console.log(await UserModel.isPasswordMatch(payLoad?.password, user.password));

    const JwtPayload = {
        userId: user.id,
        role: user.role,
    }

    const accessToken = jwt.sign(
        JwtPayload,
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );



    return {}


};

export const AuthService = {
    loginUser,
};