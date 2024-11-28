import { NextFunction, Request, Response } from "express";
import { StudentValidateSchema } from "../student/student.zod-validate";
import { studentService } from "../student/student.service";



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