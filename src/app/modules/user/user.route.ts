import express from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createStudentValidateSchema } from '../student/student.zod-validate';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';
// import { zodStudentValidations } from '../student/student.zod-validate';

const route = express.Router();

route.post(
    '/create-student',
    validateRequest(createStudentValidateSchema),
    userController.createStudent
);

route.post(
    '/create-faculty',
    validateRequest(createFacultyValidationSchema),
    userController.createFaculty
)

route.post(
    '/create-admin',
    validateRequest(createAdminValidationSchema),
    userController.createAdmin
)

export const userRouter = route;