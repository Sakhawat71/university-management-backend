import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableFields } from "./course.constant";
import { TCourseFaculty, TCouser } from "./course.interface";
import { CourseFacultyModel, CourseModel } from "./course.model"
import AppError from "../../errors/appError";
import { StatusCodes } from "http-status-codes";

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
const updateCourseIntoDB = async (id: string, payLoad: TCouser) => {

    const { preRequisiteCourses, ...courseRemainingData } = payLoad;

    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        // step 1 : basic course info update
        const updatedBasicCourseInfo = await CourseModel.findByIdAndUpdate(
            id,
            courseRemainingData,
            {
                new: true,
                runValidators: true,
                session
            }
        );
        if (!updatedBasicCourseInfo) {
            throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update course!', '');
        }


        // step 2 : check if there is any pre requisite courses to update
        if (preRequisiteCourses && preRequisiteCourses.length > 0) {

            // delete pre req course 
            const deletePreRequisite = preRequisiteCourses.filter(
                (el) => el.course && el.isDeleted
            ).map(el => el.course)
            const deletePreRequisiteCourses = await CourseModel.findByIdAndUpdate(
                id,
                {
                    $pull: { preRequisiteCourses: { course: { $in: deletePreRequisite } } }
                },
                {
                    new: true,
                    runValidators: true,
                    session
                }
            );
            if (!deletePreRequisiteCourses) {
                throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update course!', '');
            };

            // add pre req courses
            const newPreRequisites = preRequisiteCourses.filter(el => el.course && !el.isDeleted)
            const newPreRequisiteCourses = await CourseModel.findByIdAndUpdate(
                id,
                {
                    $addToSet: { preRequisiteCourses: { $each: newPreRequisites } }
                },
                {
                    new: true,
                    runValidators: true,
                    session,
                }
            );
            if (!newPreRequisiteCourses) {
                throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update course!', '');
            };

        };

        await session.commitTransaction();
        await session.endSession();

        return await CourseModel.findById(id).populate('preRequisiteCourses.course');

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update course', '');
    };
};

// soft delete course
const deleteCourseFromDB = async (id: string) => {
    return await CourseModel.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    );
};

// assign Faculties
const assignFacultiesWithCourseIntoDB = async (
    id: string,
    payLoad: Partial<TCourseFaculty>
) => {
    return await CourseFacultyModel.findByIdAndUpdate(
        id,
        {
            course: id,
            $addToSet: { faculties: { $each: payLoad } }
        },
        {
            upsert: true,
            new: true
        }
    );
};

export const CourseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    updateCourseIntoDB,
    deleteCourseFromDB,
    assignFacultiesWithCourseIntoDB
}