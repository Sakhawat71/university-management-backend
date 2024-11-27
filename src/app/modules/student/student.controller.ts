import { NextFunction, Request, Response } from "express";
import { studentService } from "./student.service";




const getAllStduents = async (
    req: Request,
    res: Response,
    next : NextFunction,
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
}


export const studentController = {
    getAllStduents,
} 