import { StudentModel } from './student.model';


const getStudentsFromDb = async () => {
    return await StudentModel.find();
}



export const studentService = {
    getStudentsFromDb,
}