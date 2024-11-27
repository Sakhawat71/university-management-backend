import { IStudent } from './student.interface';
import { StudentModel } from './student.model';


const createStudentIntoDb = async (newStudent: IStudent) => {
    return await StudentModel.create(newStudent);
}

const getStudentsFromDb = async () => {
    return await StudentModel.find();
}

const getSingleStudentById = async (id: string) => {
    return await StudentModel.findById(id);
}

const updatedStudentIntoDb = async (id: string, updatedValue: object) => {
    return await StudentModel.findByIdAndUpdate(id, updatedValue, { new: true });
}

const deleteStudentById = async (id: string) => {
    return await StudentModel.findByIdAndUpdate(id, { isDeleted: true });
}

export const studentService = {
    getStudentsFromDb,
    createStudentIntoDb,
    getSingleStudentById,
    updatedStudentIntoDb,
    deleteStudentById,
}