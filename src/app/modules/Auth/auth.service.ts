import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appError";
import { UserModel } from "../user/user.model";
import { TChangePassword, TLoginUser } from "./auth.interface";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../../config";
import bcrypt from 'bcrypt';

// login user
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

    // Create jwt refreshToken
    const refreshToken = jwt.sign(
        JwtPayload,
        config.jwt_refresh_secret as string,
        { expiresIn: '90d' }
    );

    return {
        accessToken,
        needPasswrodChange: user.needsPasswordChange,
    };
};

// change password
const changePassword = async (userData: JwtPayload, payLoad: TChangePassword) => {

    const user = await UserModel.isUserExistsByCustomId(userData?.userId);
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
    if (!(await UserModel.isPasswordMatch(payLoad.oldPassword, user?.password))) {
        throw new AppError(
            StatusCodes.FORBIDDEN,
            "Password does not match",
            ''
        );
    };

    // now hash new Passord
    const newHashedPassword = await bcrypt.hash(
        payLoad.newPassword,
        Number(config.bcrypt_salt_round),
    );

    await UserModel.findOneAndUpdate(
        {
            id: userData.userId,
            role: userData.role,
        },
        {
            password: newHashedPassword,
            needsPasswordChange: false,
            passwordChangedAt: new Date(),
        },
    )

    return null;
}

export const AuthService = {
    loginUser,
    changePassword,
};