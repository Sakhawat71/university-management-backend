import config from "../../config";
import { IStudent } from "../student/student.interface";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";


const createStudentIntoDb = async (password: string, studentData: IStudent) => {

    const user: Partial<IUser> = {};
    user.password = password || config.default_pass as string;
    user.role = "student";
    user.id = '20300100001';

    const result = await UserModel.create(user);

    if(Object.keys(result).length){
        studentData.id = result.id;
        studentData.user = result._id;
    }
    
}


export const userService = {
    createStudentIntoDb,
}