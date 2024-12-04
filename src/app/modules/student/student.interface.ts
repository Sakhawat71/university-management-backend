import { Types } from "mongoose";

export interface IUserName {
    firstName: string;
    middleName?: string | undefined;
    lastName: string;
}

export interface IGuardian {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
};

export interface ILocalGuardian {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
};

export interface IStudent {
    id: string;
    user: Types.ObjectId | string; 
    // password: string; 
    name: IUserName;
    gender: 'male' | 'female' | 'other';
    dateOfBirth?: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloogGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'; 
    presentAddress: string;
    permanentAddress: string;
    guardian: IGuardian;
    localGuardian: ILocalGuardian;
    profileImg?: string;
    admissionSemester : Types.ObjectId ;
    isDeleted: boolean;
};
