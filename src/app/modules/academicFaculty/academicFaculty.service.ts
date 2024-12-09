import IAcademicFaculty from "./academicFaculty.interface";
import { AcademicFacultyModel } from "./academicFaculty.model"

// create 
const createAcademicFacultyIntoDB = async (payload: IAcademicFaculty) => {
    return await AcademicFacultyModel.create(payload);
};

//get all
const getAllAcademicFacultiesFromDB = async () => {
    return await AcademicFacultyModel.find();
};

// get one by id
const getSingleAcademicFacultyFromDB = async (id: string) => {
    return await AcademicFacultyModel.findById(id);
}

// update one
const updateAcademicFacultyIntoDB = async (
    id: string,
    payLoad: IAcademicFaculty
) => {
    return await AcademicFacultyModel.findByIdAndUpdate(
        id,
        payLoad,
        { new: true }
    );
};

// delete one by id // Direct delete
const deleteAcademicFacultyFromDB = async (id: string) => {
    return await AcademicFacultyModel.findByIdAndDelete(id);
}

export const academicFacultySercice = {
    createAcademicFacultyIntoDB,
    getAllAcademicFacultiesFromDB,
    getSingleAcademicFacultyFromDB,
    updateAcademicFacultyIntoDB,
    deleteAcademicFacultyFromDB,
}