import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appError";
import AcademicSemesterModel from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistrationModel } from "./semesterRegistration.model";

// create 
const createSemesterRegistrationIntoDB = async (
    payLoad: TSemesterRegistration
) => {
    const academicSemester = payLoad?.academicSemester;

    // step 1 : check academic Semester Exist or not
    const isAcademicSemesterExists = await AcademicSemesterModel.findById(academicSemester);
    if (!isAcademicSemesterExists) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            'This academic semester not found !',
            ''
        )
    };

    // step 2 : check -> this semester already register or not
    const isSemesterRegistrationExist = await SemesterRegistrationModel.findOne({ academicSemester });
    if (isSemesterRegistrationExist) {
        throw new AppError(
            StatusCodes.CONFLICT,
            'This Semester Already Registered!',
            ''
        )
    };
    
    // final result 
    return await SemesterRegistrationModel.create(payLoad);
};

// get all 
const getAllSemesterRegistrationFromDB = async () => {
    return await SemesterRegistrationModel.find();
};

// get singel
const getSingleSemesterRegistrationFromDB = async (id: string) => {
    return await SemesterRegistrationModel.findById(id);
};

// update
const updateSemesterRegistrationIntoDB = async (id: string, payLoad: Partial<TSemesterRegistration>) => {
    return await SemesterRegistrationModel.findByIdAndUpdate(
        id,
        payLoad,
        {
            new: true
        }
    )
}

export const SemesterRegistrationServices = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSemesterRegistrationIntoDB
}