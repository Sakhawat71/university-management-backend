import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicFacultyService } from "./academicFaculty.service";

// create 
const createAcademicFaculty = catchAsync(async (req, res) => {
    const result = await academicFacultyService.createAcademicFacultyIntoDB(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic Faculty is created succesfully',
        data: result
    })
});

//get all
const getAllAcademicFaculties = catchAsync(async (req, res) => {
    const result = await academicFacultyService.getAllAcademicFacultiesFromDB();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic faculties retrieved successfully',
        data: result,
    });
});

// get singel 
const getSingleAcademicFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await academicFacultyService.getSingleAcademicFacultyFromDB(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Single Academic faculties retrieved successfully',
        data: result
    })
});

// update academicFaculty
const updateAcademicFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await academicFacultyService.updateAcademicFacultyIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic faculties Updated successfully',
        data: result
    });
});

// delete academicFaculty
const deleteAcademicFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await academicFacultyService.deleteAcademicFacultyFromDB(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic faculties Deleted successfully',
        data: result
    });
})


export const academicFacultyController = {
    createAcademicFaculty,
    getAllAcademicFaculties,
    getSingleAcademicFaculty,
    updateAcademicFaculty,
    deleteAcademicFaculty
}