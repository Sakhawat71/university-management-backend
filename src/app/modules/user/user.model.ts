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
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: 0,
    },
    needsPasswordChange: {
        type: Boolean,
        default: true,
    },
    passwordChangedAt: {
        type: Date,
    },
    role: {
        type: String,
        enum: ["super-admin", "admin", "student", "faculty"],
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
    return await UserModel.findOne({ id }).select('+password');
};

// password match
userSchema.statics.isPasswordMatch = async function (password: string, hash: string) {
    return await bcrypt.compare(password, hash);
};


userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
) {
    const passwordChangedTime =
        new Date(passwordChangedTimestamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamp;
};

export const UserModel = model<IUser, IUserModel>('User', userSchema); 