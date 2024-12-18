import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SemesterRegistrationServices } from "./semesterRegistration.service";



// create
const createSemesterRegistration = catchAsync(async (req, res) => {
    const result = await SemesterRegistrationServices.createSemesterRegistrationIntoDB(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Semester Registration is created successfully',
        data: result
    })
});


// get all
const getAllSemesterRegistration = catchAsync(async (req, res) => {
    const result = await SemesterRegistrationServices.getAllSemesterRegistrationFromDB(req.query)
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Semester Registration Retrieved successfully',
        data: result
    })
});

// get single 
const getSingelSemesterRegistration = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(id);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Single Semester Registration Retrieved successfully',
        data: result
    });
});

// update 
const updateSemesterRegistration = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Semester Registration Updated successfully',
        data: result
    })
});

export const semesterRegistrationController = {
    createSemesterRegistration,
    getAllSemesterRegistration,
    getSingelSemesterRegistration,
    updateSemesterRegistration
}