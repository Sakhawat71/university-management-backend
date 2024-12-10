import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import AppError from '../../errors/appError';
import { UserModel } from '../user/user.model';
import { StatusCodes } from 'http-status-codes';


const getStudentsFromDb = async () => {
    return await StudentModel
        .find()
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty'
            }
        });
}

const getSingleStudentById = async (id: string) => {
    return await StudentModel.findById(id)
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty'
            }
        });
    ;
}

// update student 
const updatedStudentIntoDb = async (id: string, updatedValue: object) => {
    return await StudentModel.findByIdAndUpdate(id, updatedValue, { new: true });
}

// delete student
const deleteStudentById = async (id: string) => {
    // transaction & rollback
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const deletedStudent = await StudentModel.findOneAndUpdate(
            { id }, 
            { isDeleted: true },
            {new : true, session}
        );

        if(!deletedStudent){
            throw new AppError(StatusCodes.BAD_REQUEST,"failed to delete student",'');
        };

        const deleteUser = await UserModel.findOneAndUpdate(
            {id},
            {isDeleted : true},
            {new : true, session}
        );

        if(!deleteUser){
            throw new AppError(StatusCodes.BAD_REQUEST,"Failed to delete user",'');
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