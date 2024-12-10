import mongoose from "mongoose";
import config from "../../config";
import AcademicSemesterModel from "../academicSemester/academicSemester.model";
import { IStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../errors/appError";
import { StatusCodes } from "http-status-codes";


const createStudentIntoDb = async (password: string, payload: IStudent) => {

    const user: Partial<IUser> = {};
    user.password = password || config.default_pass as string;
    user.role = "student";
    const admissionSemesterData = await AcademicSemesterModel.findById(payload.admissionSemester);

    // implement transaction & rollback
    // create session
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        user.id = await generateStudentId(admissionSemesterData);
        // user create
        const newUser = await UserModel.create([user], { session });
        if (!newUser.length) {
            throw new AppError(StatusCodes.BAD_REQUEST, 'Fail to create user', '')
        }
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;

        // 
        const newStudent = await StudentModel.create([payload], { session });
        if (!newStudent.length) {
            throw new AppError(StatusCodes.BAD_REQUEST, 'Fail to create student', '')
        }

        await session.commitTransaction();
        await session.endSession();
        
        return newStudent;

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }
}


export const userService = {
    createStudentIntoDb,
}