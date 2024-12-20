import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
    const result = await AuthService.loginUser(req.body);

    sendResponse(res,{
        statusCode : StatusCodes.OK,
        message : "User logged in successfully",
        success : true,
        data : result
    });
});

const changeUserPassword = catchAsync(async (req, res) => {
    const {user,body} = req;
    const result = await AuthService.changePassword(user,body);
    sendResponse(res,{
        statusCode : StatusCodes.OK,
        message : "password changed successfully",
        success : true,
        data : result
    });
});

export const AuthController = {
    loginUser,
    changeUserPassword
};