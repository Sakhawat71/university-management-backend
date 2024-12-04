import mongoose, { Schema, model } from "mongoose";
import {
  IGuardian,
  ILocalGuardian,
  IStudent,
  IUserName
} from "./student.interface";


const UserNameSchema = new Schema<IUserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const GuardianSchema = new Schema<IGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const LocalGuardianSchema = new Schema<ILocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const StudentSchema = new Schema<IStudent>({
  id: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  // password: { type: String, required: true },
  name: { type: UserNameSchema, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  dateOfBirth: { type: String },
  email: { type: String, required: true, unique: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloogGroup: { type: String, enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: { type: GuardianSchema, required: true },
  localGuardian: { type: LocalGuardianSchema, required: true },
  profileImg: { type: String },
  admissionSemester: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemesterModel'
  },
  isDeleted: { type: Boolean, default: false },
}, {
  timestamps: true,
});


StudentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

StudentSchema.pre('findOne', function (next) {
  this.findById({ isDelete: { $ne: true } })
  next()
})

// aggregate block
StudentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})


export const StudentModel = model<IStudent>("Student", StudentSchema);
