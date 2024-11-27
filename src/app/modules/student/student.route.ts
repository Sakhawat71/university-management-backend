import express from 'express';
import { studentController } from './student.controller';

const route = express.Router();


route.post('/create-student', studentController.createStudent);
route.get('/', studentController.getAllStduents);
route.get("/:id", studentController.getSingleStudent)

export const studentRouter = route;