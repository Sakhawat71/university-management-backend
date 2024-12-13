import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import AppError from '../../errors/appError';
import { UserModel } from '../user/user.model';
import { StatusCodes } from 'http-status-codes';
import { IStudent } from './student.interface';

// get all student
const getStudentsFromDb = async (searchTerm?: string) => {

    // let searchTerm = '';
    // if(query?.searchTerm){
    //     searchTerm = query?.searchTerm;
    // }
    // console.log(search);

    const filter: any = {};
    if (searchTerm) {
        const searchRegex = new RegExp(searchTerm, 'i');
        filter.$or = [
            {email : searchRegex},
        ]
    }

    return await StudentModel
        .find(filter as IStudent)
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty'
            }
        });
}

// get singel student
const getSingleStudentById = async (id: string) => {
    return await StudentModel.findOne({ id })
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty'
            }
        });
}

// update student 
const updatedStudentIntoDb = async (
    id: string,
    payload: Partial<IStudent>
) => {

    const { name, guardian, localGuardian, ...remainingStudent } = payload;
    const modifiedUpdatedData: Record<string, unknown> = {
        ...remainingStudent
    }

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    };
    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdatedData[`guardian.${key}`] = value;
        }
    };
    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedUpdatedData[`localGuardian.${key}`] = value;
        }
    };

    return await StudentModel.findOneAndUpdate(
        { id },
        modifiedUpdatedData,
        { new: true }
    );
};

// delete student
const deleteStudentById = async (id: string) => {
    // transaction & rollback
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const deletedStudent = await StudentModel.findOneAndUpdate(
            { id },
            { isDeleted: true },
            { new: true, session }
        );

        if (!deletedStudent) {
            throw new AppError(StatusCodes.BAD_REQUEST, "failed to delete student", '');
        };

        const deleteUser = await UserModel.findOneAndUpdate(
            { id },
            { isDeleted: true },
            { new: true, session }
        );

        if (!deleteUser) {
            throw new AppError(StatusCodes.BAD_REQUEST, "Failed to delete user", '');
        };

        await session.commitTransaction();
        await session.endSession();
        return deletedStudent;

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }
}

export const studentService = {
    getStudentsFromDb,
    getSingleStudentById,
    updatedStudentIntoDb,
    deleteStudentById,
}