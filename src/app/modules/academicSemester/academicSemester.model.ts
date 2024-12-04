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


academicSemesterSchema.pre('save', async function(next) {
    const isSemesterExist = await AcademicSemesterModel.findOne({
        year : this.year,
        name : this.name
    })
    if(isSemesterExist){
        throw new Error('Semester Already Exist')
    }
    next()
})

const AcademicSemesterModel = model<IAcademicSemester>('AcademicSemester', academicSemesterSchema);

export default AcademicSemesterModel;