import { model, Schema } from "mongoose";
import IAcademicDepartment from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<IAcademicDepartment>(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        academicFaculty: {
            type: Schema.Types.ObjectId,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

// Mongoose Middlewares -> Pre-save Middleware
academicDepartmentSchema.pre('save', async function (next) {
    const isDepartmentExist = await AcademicDepartmentModel.findOne({
        name : this.name
    });
    if(isDepartmentExist){
        throw new Error("This department is already exist!")
    }
    next()
});

academicDepartmentSchema.pre('findOneAndUpdate', async function(next){
    const query = this.getQuery();
    const isDepartmentExist = await AcademicDepartmentModel.findOne({
        query
    });
    if(!isDepartmentExist){
        throw new Error("This department dose not exist!")
    }
    next();
});

export const AcademicDepartmentModel = model<IAcademicDepartment>(
    'AcademicDepartment',
    academicDepartmentSchema
);