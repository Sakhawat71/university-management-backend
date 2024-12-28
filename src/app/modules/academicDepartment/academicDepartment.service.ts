import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/appError";
import { AcademicFacultyModel } from "../academicFaculty/academicFaculty.model";
import IAcademicDepartment from "./academicDepartment.interface";
import { AcademicDepartmentModel } from "./academicDepartment.model";

// create 
const createAcademicDepartmentIntoDB = async (payload: IAcademicDepartment) => {
    const isAcademicFacultyExist = await AcademicFacultyModel.findById(payload.academicFaculty);
    if(!isAcademicFacultyExist){
        throw new AppError(
            StatusCodes.NOT_FOUND,
            'Academic Faculty not found'
        )
    };
    return await AcademicDepartmentModel.create(payload);
};

//get all
const getAllAcademicDepartmentsFromDB = async () => {
    return await AcademicDepartmentModel.find().populate('academicFaculty');
};

// get one by id
const getSingleAcademicDepartmentFromDB = async (id: string) => {
    return await AcademicDepartmentModel.findById(id);
}

// update one
const updateAcademicDepartmentIntoDB = async (
    id: string,
    payLoad: IAcademicDepartment
) => {
    return await AcademicDepartmentModel.findByIdAndUpdate(
        id,
        payLoad,
        { new: true }
    ); 
};

// delete one by id // Direct delete
const deleteAcademicDepartmentFromDB = async (id: string) => {
    return await AcademicDepartmentModel.findByIdAndDelete(id);
}

export const academicDepartmentService = {
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartmentsFromDB,
    getSingleAcademicDepartmentFromDB,
    updateAcademicDepartmentIntoDB,
    deleteAcademicDepartmentFromDB,
}