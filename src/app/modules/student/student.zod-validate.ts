import { z } from "zod";

const UserNameValidateSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: "Last name is required" }),
});

const GuardianValidateSchema = z.object({
  fatherName: z.string().min(1, { message: "Father's name is required" }),
  fatherOccupation: z.string().min(1, { message: "Father's occupation is required" }),
  fatherContactNo: z.string().min(10, { message: "Father's contact number must have at least 10 digits" }),
  motherName: z.string().min(1, { message: "Mother's name is required" }),
  motherOccupation: z.string().min(1, { message: "Mother's occupation is required" }),
  motherContactNo: z.string().min(10, { message: "Mother's contact number must have at least 10 digits" }),
});

const LocalGuardianValidateSchema = z.object({
  name: z.string().min(1, { message: "Local guardian's name is required" }),
  occupation: z.string().min(1, { message: "Local guardian's occupation is required" }),
  contactNo: z.string().min(10, { message: "Local guardian's contact number must have at least 10 digits" }),
  address: z.string().min(1, { message: "Local guardian's address is required" }),
});

export const StudentValidateSchema = z.object({
  id: z.string().min(1, { message: "Student ID is required" }),
  user: z.string().regex(/^[a-fA-F0-9]{24}$/, { message: "User must be a valid ObjectId" }), // Validate ObjectId
  password: z.string().max(20,{message: "Password cannot longer than 20 character"}).min(6, { message: "Password must be at least 6 characters long" }),
  name: UserNameValidateSchema,
  gender: z.enum(["male", "female", "other"], { message: "Gender must be 'male', 'female', or 'other'" }),
  dateOfBirth: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  contactNo: z.string().min(10, { message: "Contact number must have at least 10 digits" }),
  emergencyContactNo: z.string().min(10, { message: "Emergency contact number must have at least 10 digits" }),
  bloogGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional(),
  presentAddress: z.string().min(1, { message: "Present address is required" }),
  permanentAddress: z.string().min(1, { message: "Permanent address is required" }),
  guardian: GuardianValidateSchema,
  localGuardian: LocalGuardianValidateSchema,
  profileImg: z.string().url({ message: "Invalid URL for profile image" }).optional(),
  isDeleted: z.boolean().default(false),
});
