import express from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidateSchema } from '../student/student.zod-validate';
// import { zodStudentValidations } from '../student/student.zod-validate';

const route = express.Router();

route.post(
    '/create-student',
    validateRequest(StudentValidateSchema),
    userController.createStudent
)

export const userRouter = route;