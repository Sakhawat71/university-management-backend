import { Types } from "mongoose";

export default interface IAcademicDepartment {
    name: string;
    academicFaculty: Types.ObjectId;
}