import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicSemesterServiceses } from "./academicSemester.service";


const createAcademicSemester = catchAsync(async(req,res)=> {
    const result = await academicSemesterServiceses.createAcademicSemesterIntoDb(req.body);
    sendResponse(res,{
        statusCode : StatusCodes.OK,
        success: true,
        message : 'Academy semester is created successfully',
        data : result
    })
})

export const academicSemesterController = {
    createAcademicSemester,
}