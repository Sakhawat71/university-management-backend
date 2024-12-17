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
    return await CourseModel.findById(id).populate('preRequisiteCourses.course');
};

// update one course
const updateCourseIntoDB = async (id: string, payLoad: object) => {

    const { preRequisiteCourses, ...courseRemainingData } = payLoad;

    // step 1 : basic course info update
    const updateBasicCourseInfo = await CourseModel.findByIdAndUpdate(
        id,
        courseRemainingData,
        {
            new: true,
            runValidators: true,
        }
    )

    // step 2 : check if there is any pre requisite courses to update
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {

        const deletePreRequisite = preRequisiteCourses.filter(
            (el) => el.course && el.isDeleted
        ).map(el => el.course)

        const deletePreRequisiteCourses = await CourseModel.findByIdAndUpdate(
            id,
            {
                $pull: { preRequisiteCourses: { course: { $in: deletePreRequisite } } }
            }
        )
        console.log(deletePreRequisiteCourses);
        return deletePreRequisiteCourses;
    }


    return updateBasicCourseInfo;
    // return await CourseModel.findByIdAndUpdate(id, payLoad, { new: true });
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