import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface IUser {
    id: string;
    email: string;
    password: string;
    needsPasswordChange?: boolean;
    passwordChangedAt?: Date;
    role: 'superAdmin' | 'admin' | 'student' | 'faculty';
    status: 'in-progress' | 'blocked';
    isDeleted: boolean;
};

export interface IUserModel extends Model<IUser> {
    // myStaticMethod() : number;
    isUserExistsByCustomId(id: string): Promise<IUser>;
    isPasswordMatch(password: string, hash: string): Promise<boolean>;
    isJWTIssuedBeforePasswordChanged(
        passwordChangedTimestamp: Date,
        jwtIssuedTimestamp: number,
    ): boolean;
};

export type TUserRole = keyof typeof USER_ROLE;