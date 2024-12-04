import { model, Schema } from "mongoose";
import { IAcademicSemester, TMonths } from "./academicSemester.interface";

const months : TMonths[] =  [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const academicSemesterSchema = new Schema<IAcademicSemester>({
    name: { type: String, enum: ["Autumn", "Summer", "Fall"] },
    code: { type: String, enum: ["1", "2", "3"] },
    year:{type : Date},
    startMonth: {
        type : String,
        enum : months,
    },
    endMonth: {
        type : String,
        enum: months,
    }
})

const AcademicSemesterModel = model<IAcademicSemester>('AcademicSemester',academicSemesterSchema);

export default AcademicSemesterModel;