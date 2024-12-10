// import { IStudent } from './student.interface';
import { StudentModel } from './student.model';


// const createStudentIntoDb = async (newStudent: IStudent) => {
//     return await StudentModel.create(newStudent);
// }

const getStudentsFromDb = async () => {
    return await StudentModel
        .find()
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty'
            }
        });
}

const getSingleStudentById = async (id: string) => {
    return await StudentModel.findById(id)
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty'
            }
        });
    ;
}

const updatedStudentIntoDb = async (id: string, updatedValue: object) => {
    return await StudentModel.findByIdAndUpdate(id, updatedValue, { new: true });
}

const deleteStudentById = async (id: string) => {
    return await StudentModel.findByIdAndUpdate(id, { isDeleted: true });
}

export const studentService = {
    getStudentsFromDb,
    getSingleStudentById,
    updatedStudentIntoDb,
    deleteStudentById,
}