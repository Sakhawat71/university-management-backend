import express from 'express';
import { studentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UpdateStudentValidateSchema } from './student.zod-validate';
import authValidation from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const route = express.Router();


route.get(
    '/',
    authValidation(USER_ROLE.superAdmin, USER_ROLE.admin),
    studentController.getAllStduents
);

route.get(
    "/:id",
    authValidation(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
    studentController.getSingleStudent
);

route.patch(
    "/:id",
    authValidation(USER_ROLE.superAdmin, USER_ROLE.admin),
    validateRequest(UpdateStudentValidateSchema),
    studentController.updateStudent
);

route.delete(
    "/:id",
    authValidation(USER_ROLE.superAdmin, USER_ROLE.admin),
    studentController.deleteStudent
);

export const studentRouter = route;