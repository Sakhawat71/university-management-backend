/* eslint-disable @typescript-eslint/no-explicit-any */
import { model, Schema } from "mongoose";
import IAcademicDepartment from "./academicDepartment.interface";
import AppError from "../../errors/appError";
import { StatusCodes } from "http-status-codes";

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
            ref: 'AcademicFaculty'
        }
    },
    {
        timestamps: true
    }
);

// Mongoose Middlewares -> Pre-save Middleware

// academicDepartmentSchema.pre("save", async function (next) {
//     try {
//         const isDepartmentExist = await AcademicDepartmentModel.findOne({ name: this.name });
//         if (isDepartmentExist) {
//             throw new AppError(
//                 StatusCodes.BAD_REQUEST,
//                 "This department already exists!",
//                 ""
//             );
//         };
//         next();
//     } catch (error) {
//         next(error as any);
//     }
// });

// // Pre-Find Middleware
// academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
//     try {
//         const query = this.getQuery();
//         const isDepartmentExist = await AcademicDepartmentModel.findOne({
//             query
//         });
//         if (!isDepartmentExist) {
//             throw new AppError(404, "This department dose not exist!", "")
//         }
//         next();
//     } catch (error) {
//         next(error as undefined);
//     }
// });

export const AcademicDepartmentModel = model<IAcademicDepartment>(
    'AcademicDepartment',
    academicDepartmentSchema
);