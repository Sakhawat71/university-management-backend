import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import AppError from '../../errors/appError';
import { UserModel } from '../user/user.model';
import { StatusCodes } from 'http-status-codes';
import { IStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableField } from './student.constant';

// get all student
const getStudentsFromDb = async (query: Record<string, unknown>) => {
    const studentQuery = new QueryBuilder(StudentModel.find(),query)
    .search(studentSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();

    return await studentQuery.modelQuery;
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
};


// get all student
// const getStudentsFromDb = async (query: Record<string, unknown>) => {

    // const queryObj = { ...query };
    // let searchTerm = '';
    // if (query?.searchTerm) {
    //     searchTerm = query?.searchTerm as string;
    // }

    // const searchQuery = StudentModel.find({
    //     $or: ['email', 'name.firstName', 'presentAddress'].map((field) => ({
    //         [field]: { $regex: searchTerm, $options: 'i' }
    //     }))
    // })

    // const excludeFields = ['searchTerm', 'sort', 'limit','page','fields'];
    // excludeFields.forEach((el) => delete queryObj[el]);
    // // console.log({query},{queryObj});

    // const filterQuery = searchQuery.find(queryObj)
    //     .populate('admissionSemester')
    //     .populate({
    //         path: 'academicDepartment',
    //         populate: {
    //             path: 'academicFaculty'
    //         }
    //     });

    // // sort by descending order 'email'
    // let sort = '-createdAt'
    // if (query.sort) {
    //     sort = query.sort as string;
    // }
    // const sortQuery = filterQuery.sort(sort);

    // // pageination
    // let page = 1;
    // let skip = 0;
    // let limit = 2;

    // if (query.limit) {
    //     limit = Number(query.limit);
    // }

    // if (query.page) {
    //     page = Number(query.page);
    //     skip = (page - 1) * limit;
    // }
    // // paginate 
    // const paginateQuery = sortQuery.skip(skip);
    // // limit
    // const limitQuery = paginateQuery.limit(limit);

    // let fields = '-__v';
    // if(query.fields){
    //     fields = (query.fields as string).split(',').join(' ');
    // }
    // const fieldQuery = await limitQuery.select(fields); 

    // // console.log(fields);

    // return fieldQuery;
// }