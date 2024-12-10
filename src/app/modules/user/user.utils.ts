import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import { UserModel } from "./user.model";

const findLastStudentId = async () => {
    const lastStudent = await UserModel.findOne(
        { role: 'student' },
        { id: 1, _id: 0 }
    )
        .sort({ createdAt: -1 })
        .lean();
    return lastStudent?.id ? lastStudent.id : undefined;
}

export const generateStudentId = async (payload: IAcademicSemester): Promise<string> => {

    let curretnId = (0).toString();
    const lastStudentId = await findLastStudentId();
    const lastStudentYear = lastStudentId?.substring(0,4);
    const lastStudentSemesterCode = lastStudentId?.substring(4,6);
    const currentYear = payload.year;
    const currentSemesterCode = payload.code;

    if(lastStudentId && lastStudentYear === currentYear && lastStudentSemesterCode === currentSemesterCode){
        curretnId = lastStudentId.substring(6)
    }

    const incrementId = (Number(curretnId) + 1).toString().padStart(4, '0');
    return `${payload.year}${payload.code}${incrementId}`;
}