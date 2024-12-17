import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableFields } from "./course.constant";
import { TCouser } from "./course.interface";
import { CourseModel } from "./course.model"

// create course
const createCourseIntoDB = async (payLoad: TCouser) => {
    return await CourseModel.create(payLoad);
};

// get all courses
const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(CourseModel.find().populate('preRequisiteCourses.course'), query)
        .search(courseSearchableFields)
        .fields()
        .sort()
        .paginate()
        .fields()
    return await courseQuery.modelQuery;
};

// get one course
const getSingleCourseFromDB = async (id: string) => {
    return await CourseModel.findById(id);
};

// update one course
const updateCourseIntoDB = async (id: string, payload: object) => {
    return await CourseModel.findByIdAndUpdate(id, payload, { new: true });
};

// soft delete course
const deleteCourseFromDB = async (id: string) => {
    return await CourseModel.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    );
};


export const CourseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    updateCourseIntoDB,
    deleteCourseFromDB
}