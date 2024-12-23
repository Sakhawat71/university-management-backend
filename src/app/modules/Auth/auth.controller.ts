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
    const { id: userId } = req.params;

    console.log(req.body);
    console.log(userId);

    const result = await AuthService.forgetPassword(userId);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Reset link is generated successfully',
        data: result,
    })
});

export const AuthController = {
    loginUser,
    changeUserPassword,
    refreshToken,
    forgetPassword
};