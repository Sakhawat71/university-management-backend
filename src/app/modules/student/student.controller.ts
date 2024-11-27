import { NextFunction, Request, Response } from "express";
import { studentService } from "./student.service";
import { StudentValidateSchema } from "./student.zod-validate";


const createStudent = async (
    req: Request,
    res: Response,
    next: NextFunction

) => {
    try {
        const studentData = req.body;
        const validateNewStudent = StudentValidateSchema.parse(studentData);

        const result = await studentService.createStudentIntoDb(validateNewStudent);
        res.status(201).json({
            success: true,
            message: 'Student is created succesfully',
            data: result,
        })


    } catch (error) {
        next(error)
    }
}


// get all stduents 
const getAllStduents = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const result = await studentService.getStudentsFromDb();
        res.json({
            success: true,
            message: 'Student are retrieved succesfully',
            data: result,
        })
    } catch (error) {
        next(error);
    }
};


export const studentController = {
    getAllStduents,
    createStudent,
} 