import { model, Schema } from "mongoose";
import { IAcademicSemester} from "./academicSemester.interface";
import { AcademicSemesterCode, AcademicSemesterMonths, AcademicSemesterName } from "./academicSemester.constant";



const academicSemesterSchema = new Schema<IAcademicSemester>({
    name: {
        type: String,
        enum: AcademicSemesterName,
        required : true,
    },
    code: {
        type: String,
        enum: AcademicSemesterCode,
        required : true,
    },
    year: {
        type: String,
        required: true,
    },
    startMonth: {
        type: String,
        enum: AcademicSemesterMonths,
        required : true,
    },
    endMonth: {
        type: String,
        enum: AcademicSemesterMonths,
        required: true,
    }
},{
    timestamps : true,
})

const AcademicSemesterModel = model<IAcademicSemester>('AcademicSemester', academicSemesterSchema);

export default AcademicSemesterModel;