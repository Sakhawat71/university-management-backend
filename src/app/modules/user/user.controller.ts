import { userService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";


// create student 
const createStudent = catchAsync(async (req, res) => {
    const {
        password,
        student: studentData
    } = req.body;
    const result = await userService.createStudentIntoDb(
        password,
        studentData,
        req.file
    );
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Student is created succesfully',
        data: result
    })
})

// create faculty
const createFaculty = catchAsync(async (req, res) => {
    const { password, faculty: facultyData } = req.body;

    const result = await userService.createFacultyIntoDB(req.file, password, facultyData);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Faculty is created succesfully',
        data: result,
    });
});

// create admin
const createAdmin = catchAsync(async (req, res) => {
    const { password, admin: adminData } = req.body;

    const result = await userService.createAdminIntoDB(req.file,password, adminData);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Admin is created succesfully',
        data: result,
    });
});

// create get me
const getME = catchAsync(async (req, res) => {
    const { userId, role } = req.user;
    const result = await userService.getMe(userId, role);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'User is retrieved successfully',
        data: result,
    });
});

// change status
const changeStatus = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await userService.changeStatus(id, req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Status changed successfully',
        data: result,
    });
});


export const userController = {
    createStudent,
    createFaculty,
    createAdmin,
    getME,
    changeStatus
};