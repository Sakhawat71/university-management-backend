import jwt from 'jsonwebtoken';
import { UserModel } from '../user/user.model';
import AppError from '../../errors/appError';
import { StatusCodes } from 'http-status-codes';

export const createToken = (
    jwtPayload: { userId: string; role: string },
    secret: string,
    expiresIn: string,
) => {
    return jwt.sign(jwtPayload, secret, {
        expiresIn,
    });
};


export const checkIsUserValidByCustomID = async (id: string) => {
    // const user = await UserModel.findOne({id});
    const user = await UserModel.isUserExistsByCustomId(id);
    if (!user) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            "User not found"
        );
    };

    // Check if user is deleted
    if (user.isDeleted) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "User is deleted"
        );
    };

    // Check if user is blocked
    if (user.status === 'blocked') {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "User is Blocked"
        );
    };

    return user;
};