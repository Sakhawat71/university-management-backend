import { academicSemesterNameCodeMapper, IAcademicSemester } from "./academicSemester.interface";
import AcademicSemesterModel from "./academicSemester.model"


// crete -> Academic Semester
const createAcademicSemesterIntoDb = async (payload: IAcademicSemester) => {

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
const updaetAcademicSemesterIntoDb = async (
    id: string,
    payload: Partial<IAcademicSemester>
) => {
    const isExist = await AcademicSemesterModel.findById(id);
    if (!isExist) {
        throw new Error('Academic semester is not exist in database')
    }
    if (
        payload.name &&
        payload.code &&
        academicSemesterNameCodeMapper[payload.name] !== payload.code
    ) {
        throw new Error("Invalid Semester Code")
    }
    return await AcademicSemesterModel.findByIdAndUpdate(id, payload, { new: true });
};

export const academicSemesterServiceses = {
    createAcademicSemesterIntoDb,
    getAllAcademicSemesterFormDb,
    getSingleAcademicSemesterFromDb,
    updaetAcademicSemesterIntoDb,

}