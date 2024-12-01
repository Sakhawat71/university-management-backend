import config from "../../config";
import { IStudent } from "../student/student.interface";
import { UserModel } from "./user.model";


const createStudentIntoDb = async (password : string,newStudent: IStudent) => {
    // return await StudentModel.create(newStudent);

    if(!password){
        password = config.default_pass as string;
    }
    return await UserModel.create(newStudent);
}


export const userService = {
    createStudentIntoDb,
}