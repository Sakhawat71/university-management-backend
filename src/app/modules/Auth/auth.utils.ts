import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserModel } from '../user/user.model';
import AppError from '../../errors/appError';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';

// create token
export const createToken = (
    jwtPayload: { userId: string; role: string },
    secret: string,
    expiresIn: string,
) => {
    return jwt.sign(jwtPayload, secret, {
        expiresIn,
    });
};

// check Is User Valid By CustomID
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

// verify token
export const tokenVerify = async (token: string) => {
    // if the token sent from the client
    if (!token) {
        throw new AppError(
            StatusCodes.UNAUTHORIZED,
            "Unauthorized"
        );
    };

    // check if the token is valid
    const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
    ) as JwtPayload;

    return decoded;
};