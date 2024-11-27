import { IStudent } from './student.interface';
import { StudentModel } from './student.model';


const createStudentIntoDb = async (newStudent : IStudent) => {
    return await StudentModel.create(newStudent);
}

const getStudentsFromDb = async () => {
    return await StudentModel.find();
}



export const studentService = {
    getStudentsFromDb,
    createStudentIntoDb,
}