import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OfferedCourseServices } from "./OfferedCourse.service";

// create 
const createOfferedCourse = catchAsync(async (req, res) => {
    const result = await OfferedCourseServices.createOfferedCourseIntoDB(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Offered course create successfully',
        data: result,
    })
});

// get all
const getAllOfferedCourse = catchAsync(async (req, res) => {
    const result = await OfferedCourseServices.getAllOfferedCoursesFromDB(req.query);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'OfferedCourses retrieved successfully',
        data: result,
    })
})

// get single 
const getSingleOfferedCourse = catchAsync(async (req, res) => {
    const {id} = req.params
    const result = await OfferedCourseServices.getSingleOfferedCourseFromDB(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'OfferedCourse fetched successfully',
        data: result,
    })
})

// update
// const updateOfferedCourse = catchAsync(async (req, res) => {

// })

export const OfferedCourseController = {
    createOfferedCourse,
    getAllOfferedCourse,
    getSingleOfferedCourse,
    // updateOfferedCourse,
}