import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appError";
import { UserModel } from "../user/user.model";
import { TChangePassword, TLoginUser, TResetPassword } from "./auth.interface";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../../config";
import bcrypt from 'bcrypt';
import { checkIsUserValidByCustomID, createToken } from "./auth.utils";
import { sendEmail } from "../../utils/sendEmail";

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
            "User is Blocked",
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
    const accessToken = createToken(
        JwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
    );

    // Create jwt refreshToken
    const refreshToken = createToken(
        JwtPayload,
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expires_in as string
    );

    return {
        accessToken,
        refreshToken,
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
            "User is Blocked",
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
};

// refresh Token
const refreshToken = async (token: string) => {

    // check if the token is valid
    const decoded = jwt.verify(
        token,
        config.jwt_refresh_secret as string
    ) as JwtPayload;


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
            "User is Blocked",
            ''
        );
    };

    if (
        user.passwordChangedAt &&
        UserModel.isJWTIssuedBeforePasswordChanged(
            user.passwordChangedAt,
            decoded.iat as number
        )
    ) {
        throw new AppError(
            StatusCodes.UNAUTHORIZED,
            'You Are not Authorize',
            ''
        )
    };


    const JwtPayload = {
        userId: user.id,
        role: user.role,
    };

    // Create jwt access token
    const accessToken = createToken(
        JwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
    )

    return {
        accessToken
    };
};

// forget passwrod
const forgetPassword = async (userId: string) => {

    const user = await checkIsUserValidByCustomID(userId);
    // console.log(success);

    const JwtPayload = {
        userId: user.id,
        role: user.role,
    };

    // Create jwt access token
    const resetToken = createToken(
        JwtPayload,
        config.jwt_access_secret as string,
        '10m'
    );


    const resetUiLink = `${config.reset_pass_ui_link}?id=${user.id}&token=${resetToken}`;
    sendEmail(user.email, resetUiLink);

    return resetUiLink;
};

// reset password
const resetPassword = async (
    payLoad: TResetPassword,
    token: string
) => {
    // check payload id's user exist
    const user = await checkIsUserValidByCustomID(payLoad?.id);

    // check given token valide
    const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
    ) as JwtPayload;

    // throw error if token and payload user are not same
    if (decoded.userId !== user.id) {
        throw new AppError(
            StatusCodes.FORBIDDEN,
            'Your Are Forbidden!'
        )
    };

    //hash newPassord
    const newHashedPassword = await bcrypt.hash(
        payLoad.newPassword,
        Number(config.bcrypt_salt_round),
    );

    // change password
    await UserModel.findOneAndUpdate(
        {
            id: decoded.userId,
            role: decoded.role
        },
        {
            password : newHashedPassword,
            needsPasswordChange : false,
            passwordChangedAt : new Date()
        }
    );
};

export const AuthService = {
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword,
    resetPassword
};