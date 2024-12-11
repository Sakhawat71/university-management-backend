import express from 'express';
import { studentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UpdateStudentValidateSchema } from './student.zod-validate';

const route = express.Router();


// route.post('/create-student', studentController.createStudent);
route.get('/', studentController.getAllStduents);
route.get("/:id", studentController.getSingleStudent);
route.patch(
    "/:id",
    validateRequest(UpdateStudentValidateSchema),
    studentController.updateStudent
);
route.delete("/:id", studentController.deleteStudent);

export const studentRouter = route;