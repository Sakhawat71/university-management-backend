import config from "../../config";
import AcademicSemesterModel from "../academicSemester/academicSemester.model";
import { IStudent } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";
import { generateStudentId } from "./user.utils";


const createStudentIntoDb = async (password: string, payload: IStudent) => {

    const user: Partial<IUser> = {};
    user.password = password || config.default_pass as string;
    user.role = "student";

    const admissionSemesterData = await AcademicSemesterModel.findById(payload.admissionSemester) ;
    
    user.id = await generateStudentId(admissionSemesterData);


    const newUser = await UserModel.create(user);

    if(Object.keys(newUser).length){
        payload.id = newUser.id;
        payload.user = newUser._id;

        const newStudent = await StudentModel.create(payload);
        return newStudent;
    }
}


export const userService = {
    createStudentIntoDb,
}