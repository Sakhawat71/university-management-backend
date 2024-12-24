import express from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createStudentValidateSchema } from '../student/student.zod-validate';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import authValidation from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { userValidateSchema, userValidation } from './user.validation';

const route = express.Router();

// student
route.post(
    '/create-student',
    authValidation(USER_ROLE.admin),
    validateRequest(createStudentValidateSchema),
    userController.createStudent
);

// faculty
route.post(
    '/create-faculty',
    authValidation(USER_ROLE.admin),
    validateRequest(createFacultyValidationSchema),
    userController.createFaculty
);

// admin
route.post(
    '/create-admin',
    validateRequest(createAdminValidationSchema),
    userController.createAdmin
);

// me 
route.get(
    '/me',
    authValidation('student','admin','faculty'),
    userController.getME
);

// block
route.post(
    '/change-status/:id',
    authValidation('admin'),
    validateRequest(userValidation.changeStatusValidationSchema),
    userController.changeStatus
);

export const userRouter = route;