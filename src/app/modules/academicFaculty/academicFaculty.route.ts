import { Router } from "express";
import { academicFacultyController } from "./academicFaculty.controller";
import validateRequest from "../../middlewares/validateRequest";
import { academicFacultyValidation } from "./academicFaculty.validation";
import authValidation from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const route = Router();

route.post(
    '/create-academic-faculty',
    authValidation(USER_ROLE.superAdmin, USER_ROLE.admin),
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