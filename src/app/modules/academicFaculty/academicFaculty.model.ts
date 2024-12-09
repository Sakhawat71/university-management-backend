import { model, Schema } from "mongoose";
import IAcademicFaculty from "./academicFaculty.interface";

const academicFacultySchema = new Schema<IAcademicFaculty>({
    name: {
        type: String,
        required: true,
        unique: true,
    }
}, {
    timestamps: true,
}
)

export const AcademicFacultyModel = model<IAcademicFaculty>('AcademicFaculty', academicFacultySchema);