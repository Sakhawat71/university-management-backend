import { RequestHandler } from "express";
import { studentService } from "./student.service";
import { StudentModel } from "./student.model";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

// get all students
const getAllStduents = catchAsync(async (req, res) => {
    const result = await studentService.getStudentsFromDb(req.query);
    res.json({
        success: true,
        message: 'Student are retrieved succesfully',
        data: result,
    });
});

// get specific Individual data by id
const getSingleStudent: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await studentService.getSingleStudentById(id);
        res.status(201).json({
            success: true,
            message: `get student by ${id}`,
            data: result,
        })
    } catch (error) {
        next(error);
    }
};

// update Existing student data
const updateStudent = catchAsync(async (req, res) => {

    const { id } = req.params;
    const updatedStudentData = req.body;
    if (!updatedStudentData || Object.keys(updatedStudentData).length === 0) {
        res.status(400).json({
            message: "No update data provided",
            success: false,
            data: null,
        });
        return;
    };

    const result = await studentService.updatedStudentIntoDb(id, updatedStudentData.student);
    if (!result) {
        res.status(404).json({
            message: "Student not found",
            success: false,
            date: null,
        });
        return;
    };

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: "Student updated successfully",
        success: true,
        data: result,
    });
});

// delete student as isDelete true
const deleteStudent: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const isStudentExist = await StudentModel.findOne({ id, isDeleted: { $ne: true } });
        if (!isStudentExist) {
            res.status(404).json({
                message: "Student not found or already deleted",
                success: false,
                data: null,
            });
            return;
        };

        const result = await studentService.deleteStudentById(id);
        if (!result) {
            res.status(404).json({
                message: "Student not found",
                success: false,
                date: null,
            });
            return;
        };

        res.status(201).json({
            message: "Student delete successfully",
            success: true,
            data: {},
        });

    } catch (error) {
        next(error);
    }
}


export const studentController = {
    getAllStduents,
    // createStudent,
    getSingleStudent,
    updateStudent,
    deleteStudent,
} 