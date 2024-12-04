import { IAcademicSemester, IAcademicSemesterNameCodeMapper } from "./academicSemester.interface";
import AcademicSemesterModel from "./academicSemester.model"


// crete -> Academic Semester
const createAcademicSemesterIntoDb = async (payload: IAcademicSemester) => {
    const academicSemesterNameCodeMapper: IAcademicSemesterNameCodeMapper = {
        Autumn: "1",
        Summer: "2",
        Fall: "3",
    };
    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error('Inbelieve semester code');
    }
    return await AcademicSemesterModel.create(payload);
};

// find all -> get
const getAllAcademicSemesterFormDb = async () => {
    return await AcademicSemesterModel.find();
}

// find by id
const getSingleAcademicSemesterFromDb = async (id: string) => {
    return await AcademicSemesterModel.findById(id);
}

// update one by id
const updaetAcademicSemesterIntoDb = async (id: string, updatedData: object) => {
    return await AcademicSemesterModel.findByIdAndUpdate(id, updatedData, { new: true });
}

export const academicSemesterServiceses = {
    createAcademicSemesterIntoDb,
    getAllAcademicSemesterFormDb,
    getSingleAcademicSemesterFromDb,
    updaetAcademicSemesterIntoDb,

}