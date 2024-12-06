import { IAcademicSemester } from "../academicSemester/academicSemester.interface";

export const generateStudentId = async (payload: IAcademicSemester): Promise<string> => {
    const curretnId = (0).toString();
    const incrementId = (Number((curretnId) + 1)).toString().padStart(4, '0');
    return `${payload.year}${payload.code}${incrementId}`;
}