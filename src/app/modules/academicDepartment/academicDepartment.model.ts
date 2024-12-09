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
 
export const AcademicDepartmentModel = model<IAcademicDepartment>(
    'AcademicDepartment',
    academicDepartmentSchema
);