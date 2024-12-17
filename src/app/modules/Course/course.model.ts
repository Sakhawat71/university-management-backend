import { model, Schema } from "mongoose";
import { TCouser, TPreRequisiteCourses } from "./course.interface";

const preRequisiteCourseSchema = new Schema<TPreRequisiteCourses>({
    course: {
        type: Schema.Types.ObjectId,
        ref : 'Course'
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
    },
    preRequisiteCourses: [preRequisiteCourseSchema],
},
    {
        timestamps: true,
    }
);

export const CourseModel = model<TCouser>('Course', courseSchema);  