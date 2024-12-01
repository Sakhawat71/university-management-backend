import express from 'express';
import { UserController } from './user.controller';

const route = express.Router();


route.post('/create-student', UserController.createStudent)

export const userRouter = route;