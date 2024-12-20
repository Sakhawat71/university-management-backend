import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import config from "../../config";

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


export const AuthController = {
    loginUser,
    changeUserPassword,
    refreshToken
};