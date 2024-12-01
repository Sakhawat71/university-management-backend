import { IStudent } from "../student/student.interface";
import { UserModel } from "./user.model";


const createStudentIntoDb = async (newStudent: IStudent) => {
    // return await StudentModel.create(newStudent);
    return await UserModel.create(newStudent);
}


export const userService = {
    createStudentIntoDb,
}