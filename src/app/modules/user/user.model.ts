import { model, Schema } from "mongoose";
import { IUser, IUserModel } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

const userSchema = new Schema<IUser, IUserModel>({
    id: {
        type: String,
        required: true,
        unique: true,
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
        default: "in-progress",
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
})

// user passworrd hashing 
userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_round),
    );
    next();
});

// user password remove from response
userSchema.post("save", function (doc, next) {
    doc.password = "";
    next();
});

// user exists by custom id
userSchema.statics.isUserExistsByCustomId = async function (id: string) {
    return await UserModel.findOne({ id });
};

// is user deleted
// userSchema.statics.isUserDeleted = async function (id: string) { 
//     return await UserModel.findOne({ id, isDeleted: true });
// };

// is user blocked
// userSchema.statics.isUserBlocked = async function (id: string) {
//     return await UserModel.findOne({ id, status: 'blocked' });
// };

// password match
userSchema.statics.isPasswordMatch = async function (password: string, hash: string) {
    return await bcrypt.compare(password, hash);
}

export const UserModel = model<IUser, IUserModel>('User', userSchema); 