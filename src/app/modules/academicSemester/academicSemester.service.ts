import { IAcademicSemester } from "./academicSemester.interface";
import AcademicSemesterModel from "./academicSemester.model"

const createAcademicSemesterIntoDb = async (payload : IAcademicSemester) => {
    return await AcademicSemesterModel.create(payload);
};

export const academicSemesterServiceses = {
    createAcademicSemesterIntoDb,
}