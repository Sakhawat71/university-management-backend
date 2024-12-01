import { NextFunction, Request, Response } from "express";
// import { StudentValidateSchema } from "../student/student.zod-validate";
import { userService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";


// create student 
const createStudent = async (
    req: Request,
    res: Response,
    next: NextFunction

) => {
    try {
        const { password, student: studentData } = req.body;
        // const validateNewStudent = StudentValidateSchema.parse(studentData);

        const result = await userService.createStudentIntoDb(password, studentData);
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'Student is created succesfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const userController = {
    createStudent,
}