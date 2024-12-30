import { model, Schema } from "mongoose";
import { TCourseFaculty, TCouser, TPreRequisiteCourses } from "./course.interface";

const preRequisiteCourseSchema = new Schema<TPreRequisiteCourses>({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
})

const courseSchema = new Schema<TCouser>({
    title: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    prefix: {
        type: String,
        trim: true,
        required: true,
    },
    code: {
        type: Number,
        trim: true,
        required: true,
    },
    credits: {
        type: Number,
        trim: true,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        required: false,
        default: false,
    },
    preRequisiteCourses: [preRequisiteCourseSchema],
},
    {
        timestamps: true,
    }
);

export const CourseModel = model<TCouser>('Course', courseSchema);

const courseFacultySchema = new Schema<TCourseFaculty>(
    {
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
            unique: true,
        },
        faculties: [{
            type: Schema.Types.ObjectId,
            ref: 'Faculty',
        }]
    },
    {
        timestamps: true
    }
);

// this is not for course 
export const CourseFacultyModel = model<TCourseFaculty>('CourseFaculty', courseFacultySchema);