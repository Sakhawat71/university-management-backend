import { userService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { tokenVerify } from "../Auth/auth.utils";



// create student 
const createStudent = catchAsync(async (req, res) => {
    const { password, student: studentData } = req.body;
    const result = await userService.createStudentIntoDb(password, studentData);
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

    const result = await userService.createFacultyIntoDB(password, facultyData);

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

    const result = await userService.createAdminIntoDB(password, adminData);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Admin is created succesfully',
        data: result,
    });
});


// create get me
const getME = catchAsync(async (req, res) => {
    const token = req.headers.authorization;

    const decoded = await tokenVerify(token as string);
    const {userId,role} = decoded;
    console.log(userId,role);

    // const result = await userService.getMe();
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Get Me',
        // data: result,
    });
});

export const userController = {
    createStudent,
    createFaculty,
    createAdmin,
    getME
}