import config from "../../config";
import { IStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";


const createStudentIntoDb = async (password: string, studentData: IStudent) => {

    const user: Partial<IUser> = {};
    user.password = password || config.default_pass as string;
    user.role = "student";
    user.id = '20300100002';

    const newUser = await UserModel.create(user);

    if(Object.keys(newUser).length){
        studentData.id = newUser.id;
        studentData.user = newUser._id;

        const newStudent = await StudentModel.create(studentData);
        return newStudent;
    }
}


export const userService = {
    createStudentIntoDb,
}