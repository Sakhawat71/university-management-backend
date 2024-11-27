import express from 'express';
import { studentController } from './student.controller';

const route = express.Router();


route.post('/create-student', studentController.createStudent);
route.get('/', studentController.getAllStduents);

export const studentRouter = route;