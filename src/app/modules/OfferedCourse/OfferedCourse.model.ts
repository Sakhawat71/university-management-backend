import mongoose, { Schema } from "mongoose";
import { TOfferedCourse } from "./OfferedCourse.interface";
import { Days } from "./OfferedCourse.constants";

const offeredCourseSchema = new mongoose.Schema<TOfferedCourse>(
    {
        semesterRegistration: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'SemesterRegistration',
        },
        academicSemester: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'AcademicSemester',
        },
        academicFaculty: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'AcademicFaculty',
        },
        academicDepartment: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'AcademicDepartment',
        },
        course: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Course',
        },
        faculty: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Faculty',
        },
        maxCapacity: {
            type: Number,
            required: true,
        },
        section: {
            type: Number,
            required: true,
        },
        days: [
            {
                type: String,
                enum: Days,
            },
        ],
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export const OfferedCourseModel = mongoose.model<TOfferedCourse>(
    'OfferedCourse',
    offeredCourseSchema,
);