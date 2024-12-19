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

export const AuthController = {
    loginUser,
};