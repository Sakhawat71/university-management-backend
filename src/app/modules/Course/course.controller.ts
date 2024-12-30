import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { CourseServices } from './course.service';
import sendResponse from '../../utils/sendResponse';
import { CourseFacultyModel } from './course.model';

// create 
const createCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.createCourseIntoDB(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Course is created succesfully',
        data: result,
    });
});

// get all
const getAllCourses = catchAsync(async (req, res) => {
    const result = await CourseServices.getAllCoursesFromDB(req.query);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Course are retrieved successfully',
        data: result,
    });
});

// get single
const getSingleCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.getSingleCourseFromDB(id);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Course is retrieved succesfully',
        data: result,
    });
});

// update
const updateCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.updateCourseIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'course is updated succesfully',
        data: result,
    });
});

// delete
const deleteCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.deleteCourseFromDB(id);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Course is deleted succesfully',
        data: result,
    });
});

// assign faculties for courses
const assignFacultiesWithCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const { faculties } = req.body;

    const result = await CourseServices.assignFacultiesWithCourseIntoDB(
        courseId,
        faculties,
    );

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Faculties Assigned succesfully',
        data: result,
    });
});

// get assigned faculties
const getallFacultiesWithCourse = catchAsync(async (req, res) => {
    const id = req.params.courseId;
    const result = await CourseServices.getAssignedFacultiesFromDB(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Assigned Faculties retrieved succesfully',
        data: result,
    });
});

// remove faculties form courses
const removeFacultiesFromCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const { faculties } = req.body;

    const result = await CourseServices.removeFacultiesFromCourseFromDB(
        courseId,
        faculties,
    );

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Faculties removed succesfully',
        data: result,
    });
});

export const CourseControllers = {
    createCourse,
    getSingleCourse,
    getAllCourses,
    updateCourse,
    deleteCourse,
    assignFacultiesWithCourse,
    getallFacultiesWithCourse,
    removeFacultiesFromCourse,
};