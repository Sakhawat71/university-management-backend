import { userService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";



// create student 
const createStudent = catchAsync(async (req, res) => {
    const { password, student: studentData } = req.body;
    const result = await userService.createStudentIntoDb(password, studentData);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Student is created succesfully',
        data: result
    })
})

export const userController = {
    createStudent,
}