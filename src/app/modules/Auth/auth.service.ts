import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appError";
import { UserModel } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from 'bcrypt'


const loginUser = async (payLoad: TLoginUser) => {
    // Check if user exists
    const isUserExist = await UserModel.findOne({ id: payLoad.id });
    if (!isUserExist) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            "User not found",
            ''
        );
    };

    // console.log(isUserExist);

    // Check if user is deleted
    const isUserDeleted = isUserExist?.isDeleted;
    if (isUserDeleted) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "User is deleted",
            ''
        );
    };

    // Check if user is blocked
    const userStatus = isUserExist?.status;
    if(userStatus === 'blocked') {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "User is bloack",
            ''
        );
    };

    // Check if password match
    const isPsswordMatch = await bcrypt.compare(payLoad?.password, isUserExist?.password);
    console.log(isPsswordMatch);








};

export const AuthService = {
    loginUser,
};