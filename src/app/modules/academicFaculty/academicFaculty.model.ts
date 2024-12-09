import { model, Schema } from "mongoose";
import IAcademicFaculty from "./academicFaculty.interface";

const academicFacultySchema = new Schema<IAcademicFaculty>({
    name : {
        type : String,
        required : true,
    }
})

export const AcademicSemesterModel = model<IAcademicFaculty>('AcademicSemester',academicFacultySchema);