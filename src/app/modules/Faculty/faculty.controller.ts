import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacultyServices } from './faculty.service';

// get all
const getAllFaculties = catchAsync(async (req, res) => {
    const result = await FacultyServices.getAllFacultiesFromDB(req.query);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Faculties are retrieved succesfully',
        data: result,
    });
});

// get single
const getSingleFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await FacultyServices.getSingleFacultyFromDB(id);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Faculty is retrieved succesfully',
        data: result,
    });
});

// update
const updateFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { faculty } = req.body;
    const result = await FacultyServices.updateFacultyIntoDB(id, faculty);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Faculty is updated succesfully',
        data: result,
    });
});

//delete
const deleteFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await FacultyServices.deleteFacultyFromDB(id);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Faculty is deleted succesfully',
        data: result,
    });
});

export const FacultyControllers = {
    getAllFaculties,
    getSingleFaculty,
    deleteFaculty,
    updateFaculty,
};