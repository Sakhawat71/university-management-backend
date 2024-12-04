import { IAcademicSemester, IAcademicSemesterNameCodeMapper } from "./academicSemester.interface";
import AcademicSemesterModel from "./academicSemester.model"

const createAcademicSemesterIntoDb = async (payload: IAcademicSemester) => {

    const academicSemesterNameCodeMapper: IAcademicSemesterNameCodeMapper = {
        Autumn: "1",
        Summer: "2",
        Fall: "3",
    };

    if(academicSemesterNameCodeMapper[payload.name] !== payload.code){
        throw new Error('Inbelieve semester code');
    }

    return await AcademicSemesterModel.create(payload);
};

export const academicSemesterServiceses = {
    createAcademicSemesterIntoDb,
}