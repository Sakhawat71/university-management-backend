import { Schema } from "mongoose";
import { IAcademicSemester } from "./academicSemester.interface";

const academicSemesterSchema = new Schema<IAcademicSemester>({
    name: { type: String, enum: ["Autumn", "Summer", "Fall"] },
    code: { type: String, enum: ["1", "2", "3"] },
    year:{type : Date},
    startMonth: {type : String},
    endMonth: {type : String}
})