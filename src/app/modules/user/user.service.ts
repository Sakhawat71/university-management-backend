import { IAcademicSemester } from './../academicSemester/academicSemester.interface';
/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import config from "../../config";
import AcademicSemesterModel from "../academicSemester/academicSemester.model";
import { IStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";
import { generateAdminId, generateFacultyId, generateStudentId } from "./user.utils";
import AppError from "../../errors/appError";
import { StatusCodes } from "http-status-codes";
import { TFaculty } from "../Faculty/faculty.interface";
import { AcademicDepartmentModel } from "../academicDepartment/academicDepartment.model";
import { FacultyModel } from "../Faculty/faculty.model";
import { AdminModel } from "../Admin/admin.model";

// students
const createStudentIntoDb = async (password: string, payload: IStudent) => {

    // create a user object
    const user: Partial<IUser> = {};

    // if password is Not given, use default password.
    user.password = password || config.default_pass as string;

    // set user role and email
    user.role = "student";
    user.email = payload.email;

    // find academic semester info
    const admissionSemesterData = await AcademicSemesterModel.findById(payload.admissionSemester);
    if (!admissionSemesterData) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            'Admission semester not found'
        );
    };


    // implement transaction & rollback
    // create session
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // set Generated id
        user.id = await generateStudentId(admissionSemesterData as IAcademicSemester);

        // Create a user
        const newUser = await UserModel.create([user], { session });
        if (!newUser.length) {
            throw new AppError(
                StatusCodes.BAD_REQUEST,
                'Fail to create user'
            )
        };

        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;

        // 
        const newStudent = await StudentModel.create([payload], { session });
        if (!newStudent.length) {
            throw new AppError(
                StatusCodes.BAD_REQUEST,
                'Fail to create student'
            )
        };

        await session.commitTransaction();
        await session.endSession();

        return newStudent;

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }
}

// faculty
const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
    // create a user object
    const userData: Partial<IUser> = {};

    //if password is not given , use deafult password
    userData.password = password || (config.default_pass as string);

    //set user role
    userData.role = 'faculty';
    userData.email = payload.email;

    // find academic department info
    const academicDepartment = await AcademicDepartmentModel.findById(
        payload.academicDepartment,
    );

    if (!academicDepartment) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            'Academic department not found'
        );
    };

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        //set  generated id
        userData.id = await generateFacultyId();

        // create a user (transaction-1)
        const newUser = await UserModel.create([userData], { session }); // array

        //create a faculty
        if (!newUser.length) {
            throw new AppError(
                StatusCodes.BAD_REQUEST,
                'Failed to create user'
            );
        };

        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id

        // create a faculty (transaction-2)

        const newFaculty = await FacultyModel.create([payload], { session });

        if (!newFaculty.length) {
            throw new AppError(
                StatusCodes.BAD_REQUEST,
                'Failed to create faculty'
            );
        };

        await session.commitTransaction();
        await session.endSession();

        return newFaculty;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};

// admin
const createAdminIntoDB = async (password: string, payload: TFaculty) => {
    // create a user object
    const userData: Partial<IUser> = {};

    //if password is not given , use deafult password
    userData.password = password || (config.default_pass as string);

    //set student role and email
    userData.role = 'admin';
    userData.email = payload.email;

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        //set  generated id
        userData.id = await generateAdminId();

        // create a user (transaction-1)
        const newUser = await UserModel.create([userData], { session });

        //create a admin
        if (!newUser.length) {
            throw new AppError(
                StatusCodes.BAD_REQUEST,
                'Failed to create admin'
            );
        };

        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id

        // create a admin (transaction-2)
        const newAdmin = await AdminModel.create([payload], { session });

        if (!newAdmin.length) {
            throw new AppError(
                StatusCodes.BAD_REQUEST,
                'Failed to create admin'
            );
        };

        await session.commitTransaction();
        await session.endSession();

        return newAdmin;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};

// get me
const getMe = async () => {
    // return await  
};

export const userService = {
    createStudentIntoDb,
    createFacultyIntoDB,
    createAdminIntoDB,
    getMe,
}