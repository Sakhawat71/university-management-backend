import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import config from "../../config";

// user login
const loginUser = catchAsync(async (req, res) => {
    const result = await AuthService.loginUser(req.body);
    const { refreshToken, accessToken, needPasswrodChange } = result;

    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 365,
    })
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "User logged in successfully",
        success: true,
        data: {
            accessToken,
            needPasswrodChange,
        }
    });
});

// change password
const changeUserPassword = catchAsync(async (req, res) => {
    const { user, body } = req;
    const result = await AuthService.changePassword(user, body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "password changed successfully",
        success: true,
        data: result
    });
});

// refresh Token
const refreshToken = catchAsync(async (req, res) => {

    const { refreshToken } = req.cookies;

    const result = await AuthService.refreshToken(refreshToken);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "refreshToken create successfully",
        success: true,
        data: result
    });
});

// forget Password
const forgetPassword = catchAsync(async (req, res) => {
    const {id} = req.body;
    const result = await AuthService.forgetPassword(id);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Reset link is generated successfully',
        data: result,
    })
});

// reset Password
const resetPassword = catchAsync(async (req, res) => {
    const token = req.headers.authorization;
    const result = await AuthService.resetPassword(req.body,token as string);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Reset password successfully',
        data: result,
    })
});

export const AuthController = {
    loginUser,
    changeUserPassword,
    refreshToken,
    forgetPassword,
    resetPassword
};