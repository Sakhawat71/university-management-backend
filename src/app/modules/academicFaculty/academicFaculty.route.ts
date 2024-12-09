import { Router } from "express";
import { academicFacultyController } from "./academicFaculty.controller";
import validateRequest from "../../middlewares/validateRequest";
import { academicFacultyValidation } from "./academicFaculty.validation";

const route = Router();

route.post(
    '/create-academic-faculty',
    validateRequest(academicFacultyValidation.createAcademicFacultyValidation),
    academicFacultyController.createAcademicFaculty
);

route.get(
    '/',
    academicFacultyController.getAllAcademicFaculties
);

route.get(
    '/:id',
    academicFacultyController.getSingleAcademicFaculty
);

route.patch(
    '/:id',
    validateRequest(academicFacultyValidation.updateAcademicFacultyValidation),
    academicFacultyController.updateAcademicFaculty
);

route.delete(
    '/:id',
    academicFacultyController.deleteAcademicFaculty
);

export const academicFacultyRoutes = route;