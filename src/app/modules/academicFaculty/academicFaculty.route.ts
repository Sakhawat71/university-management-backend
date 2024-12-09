import { Router } from "express";
import { academicFacultyController } from "./academicFaculty.controller";

const route = Router();

route.post('/create-academic-faculty', academicFacultyController.createAcademicFaculty);
route.get('/', academicFacultyController.getAllAcademicFaculties);
route.get('/:id', academicFacultyController.getSingleAcademicFaculty);
route.patch('/:id', academicFacultyController.updateAcademicFaculty);
route.delete('/:id',academicFacultyController.deleteAcademicFaculty);

export const academicFacultyRoutes = route;