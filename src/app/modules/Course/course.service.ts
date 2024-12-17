import { CourseModel } from "./course.model"

// create course
const createCourseIntoDB = async () => {
    return await CourseModel.create();
};

// get all courses
const getAllCoursesFromDB = async () => {
    return await CourseModel.find();
};

// get one course
const getSingleCourseFromDB = async (id: string) => {
    return await CourseModel.findById(id);
};

// update one course
const updateCourseIntoDB = async (id: string, payload : object) => {
    return await CourseModel.findByIdAndUpdate(id,payload,{new : true});
};

// soft delete course
const deleteCourseIntoDB = async (id: string) => {
    return await CourseModel.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    );
};


export const courseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    updateCourseIntoDB,
    deleteCourseIntoDB
}