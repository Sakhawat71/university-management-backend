import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicDepartmentService } from "./academicDepartment.service";

// create 
const createAcademicDepartment = catchAsync(async (req, res) => {
    const result = await academicDepartmentService.createAcademicDepartmentIntoDB(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic Department is created succesfully',
        data: result
    })
});

//get all
const getAllAcademicDepartments = catchAsync(async (req, res) => {
    const result = await academicDepartmentService.getAllAcademicDepartmentsFromDB();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic Departments are retrieved successfully',
        data: result,
    });
});

// get singel 
const getSingleAcademicDepartment = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await academicDepartmentService.getSingleAcademicDepartmentFromDB(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Single Academic Department is retrieved successfully',
        data: result
    })
});

// update academicDepartment
const updateAcademicDepartment = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await academicDepartmentService.updateAcademicDepartmentIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic Department is Updated successfully',
        data: result
    });
});

// delete academicDepartment
const deleteAcademicDepartment = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await academicDepartmentService.deleteAcademicDepartmentFromDB(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Academic Department Deleted successfully',
        data: result
    });
})


export const academicDepartmentController = {
    createAcademicDepartment,
    getAllAcademicDepartments,
    getSingleAcademicDepartment,
    updateAcademicDepartment,
    deleteAcademicDepartment
}