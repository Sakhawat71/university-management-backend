import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createStudentValidateSchema } from '../student/student.zod-validate';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import authValidation from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { userValidation } from './user.validation';
import { upload } from '../../utils/uploadImage';

const route = express.Router();

// student
route.post(
    '/create-student',
    authValidation(USER_ROLE.superAdmin, USER_ROLE.admin),
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data)
        next()
    },
    validateRequest(createStudentValidateSchema),
    userController.createStudent
);

// faculty
route.post(
    '/create-faculty',
    authValidation(USER_ROLE.superAdmin, USER_ROLE.admin),
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data)
        next()
    },
    validateRequest(createFacultyValidationSchema),
    userController.createFaculty
);

// admin
route.post(
    '/create-admin',
    authValidation(USER_ROLE.superAdmin, USER_ROLE.admin),
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data)
        next()
    },
    validateRequest(createAdminValidationSchema),
    userController.createAdmin
);

// me 
route.get(
    '/me',
    authValidation('student', 'admin', 'faculty', 'superAdmin'),
    userController.getME
);

// block
route.post(
    '/change-status/:id',
    authValidation(USER_ROLE.superAdmin, USER_ROLE.admin),
    validateRequest(userValidation.changeStatusValidationSchema),
    userController.changeStatus
);

export const userRouter = route;