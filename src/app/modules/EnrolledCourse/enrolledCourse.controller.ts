import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EnrolledCourseServices } from './enrolledCourse.service';

const createEnrolledCourse = catchAsync(async (req, res) => {
    const userId = req.user.userId;
    const result = await EnrolledCourseServices.createEnrolledCourseIntoDB(
        userId,
        req.body,
    );

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Student is enrolled succesfully',
        data: result,
    });
});

const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
    const facultyId = req.user.userId;
    const result = await EnrolledCourseServices.updateEnrolledCourseMarksIntoDB(
        facultyId,
        req.body,
    );

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Marks is updated succesfully',
        data: result,
    });
});


const getMyEnrolledCourses = catchAsync(async (req, res) => {
    const userId = req.user.userId;
    const result = await EnrolledCourseServices.getMyEnrolledCoursesFromDB(userId);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'My enrolled courses fetched succesfully',
        data: result,
    });
});

export const EnrolledCourseControllers = {
    createEnrolledCourse,
    updateEnrolledCourseMarks,
    getMyEnrolledCourses,
};