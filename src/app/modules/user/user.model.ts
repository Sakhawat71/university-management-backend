import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>({
    id: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    needsPasswordChange: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        enum: ["admin", "student", "faculty"],
        required: true
    },
    status: {
        type: String,
        enum: ["in-progress", "blocked"],
        default : "in-progress",
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
})

export const UserModel = model<IUser>('User',userSchema); 