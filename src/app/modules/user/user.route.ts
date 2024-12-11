import express from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createStudentValidateSchema } from '../student/student.zod-validate';
// import { zodStudentValidations } from '../student/student.zod-validate';

const route = express.Router();

route.post(
    '/create-student',
    validateRequest(createStudentValidateSchema),
    userController.createStudent
)

export const userRouter = route;