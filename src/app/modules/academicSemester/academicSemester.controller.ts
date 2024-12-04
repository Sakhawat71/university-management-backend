import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicSemesterServiceses } from "./academicSemester.service";

// create controller for academic semester
const createAcademicSemester = catchAsync(async (req, res) => {
    const result = await academicSemesterServiceses.createAcademicSemesterIntoDb(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academy semester is created successfully',
        data: result
    })
})


// find all for academic semester
const getAllAcademicSemesters = catchAsync(async (req, res) => {
    const result = await academicSemesterServiceses.getAllAcademicSemesterFormDb();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic semester is retrieved succesfully',
        data: result,
    })
})


export const academicSemesterController = {
    createAcademicSemester,
    getAllAcademicSemesters,
}