/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { TEnrolledCourse } from './enrolledCourse.interface';
import EnrolledCourse from './enrolledCourse.model';
import { calculateGradeAndPoints } from './enrolledCourse.utils';
import AppError from '../../errors/appError';
import { StatusCodes } from 'http-status-codes';
import { OfferedCourseModel } from '../OfferedCourse/OfferedCourse.model';
import { StudentModel } from '../student/student.model';
import { CourseModel } from '../Course/course.model';
import { SemesterRegistrationModel } from '../semesterRegistration/semesterRegistration.model';
import { FacultyModel } from '../Faculty/faculty.model';

const createEnrolledCourseIntoDB = async (
    userId: string,
    payload: TEnrolledCourse,
) => {
    /**
    * Step1: Check if the offered cousres is exists
    * Step2: Check if the student is already enrolled
    * Step3: Check if the max credits exceed
    * Step4: Create an enrolled course
    */

    const { offeredCourse } = payload;

    const isOfferedCourseExists = await OfferedCourseModel.findById(offeredCourse);

    if (!isOfferedCourseExists) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            'Offered course not found !'
        );
    };

    if (isOfferedCourseExists.maxCapacity <= 0) {
        throw new AppError(
            StatusCodes.BAD_GATEWAY,
            'Room is full !'
        );
    };

    const student = await StudentModel.findOne({ id: userId }, { _id: 1 });

    if (!student) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            'Student not found !'
        );
    };

    const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
        semesterRegistration: isOfferedCourseExists?.semesterRegistration,
        offeredCourse,
        student: student._id,
    });

    if (isStudentAlreadyEnrolled) {
        throw new AppError(
            StatusCodes.CONFLICT,
            'Student is already enrolled !'
        );
    };

    // check total credits exceeds maxCredit
    const course = await CourseModel.findById(isOfferedCourseExists.course);
    const currentCredit = course?.credits;

    const semesterRegistration = await SemesterRegistrationModel.findById(
        isOfferedCourseExists.semesterRegistration,
    ).select('maxCredit');

    const maxCredit = semesterRegistration?.maxCredit;

    const enrolledCourses = await EnrolledCourse.aggregate([
        {
            $match: {
                semesterRegistration: isOfferedCourseExists.semesterRegistration,
                student: student._id,
            },
        },
        {
            $lookup: {
                from: 'courses',
                localField: 'course',
                foreignField: '_id',
                as: 'enrolledCourseData',
            },
        },
        {
            $unwind: '$enrolledCourseData',
        },
        {
            $group: {
                _id: null,
                totalEnrolledCredits: { $sum: '$enrolledCourseData.credits' },
            },
        },
        {
            $project: {
                _id: 0,
                totalEnrolledCredits: 1,
            },
        },
    ]);

    //  total enrolled credits + new enrolled course credit > maxCredit
    const totalCredits =
        enrolledCourses.length > 0 ? enrolledCourses[0].totalEnrolledCredits : 0;

    if (totalCredits && maxCredit && totalCredits + currentCredit > maxCredit) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            'You have exceeded maximum number of credits !',
        );
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const result = await EnrolledCourse.create(
            [
                {
                    semesterRegistration: isOfferedCourseExists.semesterRegistration,
                    academicSemester: isOfferedCourseExists.academicSemester,
                    academicFaculty: isOfferedCourseExists.academicFaculty,
                    academicDepartment: isOfferedCourseExists.academicDepartment,
                    offeredCourse: offeredCourse,
                    course: isOfferedCourseExists.course,
                    student: student._id,
                    faculty: isOfferedCourseExists.faculty,
                    isEnrolled: true,
                },
            ],
            { session },
        );

        if (!result) {
            throw new AppError(
                StatusCodes.BAD_REQUEST,
                'Failed to enroll in this cousre !',
            );
        }

        const maxCapacity = isOfferedCourseExists.maxCapacity;
        await OfferedCourseModel.findByIdAndUpdate(offeredCourse, {
            maxCapacity: maxCapacity - 1,
        });

        await session.commitTransaction();
        await session.endSession();

        return result;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};

// update
const updateEnrolledCourseMarksIntoDB = async (
    facultyId: string,
    payload: Partial<TEnrolledCourse>,
) => {
    const { semesterRegistration, offeredCourse, student, courseMarks } = payload;

    const isSemesterRegistrationExists =
        await SemesterRegistrationModel.findById(semesterRegistration);

    if (!isSemesterRegistrationExists) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            'Semester registration not found !',
        );
    }

    const isOfferedCourseExists = await OfferedCourseModel.findById(offeredCourse);

    if (!isOfferedCourseExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Offered course not found !');
    }
    const isStudentExists = await StudentModel.findById(student);

    if (!isStudentExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Student not found !');
    }

    const faculty = await FacultyModel.findOne({ id: facultyId }, { _id: 1 });

    if (!faculty) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Faculty not found !');
    }

    const isCourseBelongToFaculty = await EnrolledCourse.findOne({
        semesterRegistration,
        offeredCourse,
        student,
        faculty: faculty._id,
    });

    if (!isCourseBelongToFaculty) {
        throw new AppError(StatusCodes.FORBIDDEN, 'You are forbidden! !');
    }

    const modifiedData: Record<string, unknown> = {
        ...courseMarks,
    };

    if (courseMarks?.finalTerm) {
        const { classTest1, classTest2, midTerm, finalTerm } =
            isCourseBelongToFaculty.courseMarks;

        const totalMarks =
            Math.ceil(classTest1) +
            Math.ceil(midTerm) +
            Math.ceil(classTest2) +
            Math.ceil(finalTerm);

        const result = calculateGradeAndPoints(totalMarks);

        modifiedData.grade = result.grade;
        modifiedData.gradePoints = result.gradePoints;
        modifiedData.isCompleted = true;
    }

    if (courseMarks && Object.keys(courseMarks).length) {
        for (const [key, value] of Object.entries(courseMarks)) {
            modifiedData[`courseMarks.${key}`] = value;
        }
    }

    const result = await EnrolledCourse.findByIdAndUpdate(
        isCourseBelongToFaculty._id,
        modifiedData,
        {
            new: true,
        },
    );

    return result;
};

export const EnrolledCourseServices = {
    createEnrolledCourseIntoDB,
    updateEnrolledCourseMarksIntoDB,
};