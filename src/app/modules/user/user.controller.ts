import { NextFunction, Request, RequestHandler, Response } from "express";
// import { StudentValidateSchema } from "../student/student.zod-validate";
import { userService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";


const catchAsync = (func: RequestHandler) => {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        Promise.resolve(func(req, res, next)).catch((error) => next(error));
    }
};


// create student 
const createStudent = catchAsync(async (req, res, next) => {

    const { password, student: studentData } = req.body;
    // const validateNewStudent = StudentValidateSchema.parse(studentData);
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