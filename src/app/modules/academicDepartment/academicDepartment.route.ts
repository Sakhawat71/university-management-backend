import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { academicDepartmentController } from "./academicDepartment.controller";
import { academicDepartmentValidation } from "./academicDepartment.validation";

const route = Router();

route.post(
    '/create-academic-department',
    // validateRequest(academicDepartmentValidation.createAcademicDepartmentValidation),
    academicDepartmentController.createAcademicDepartment
);

route.get(
    '/',
    academicDepartmentController.getAllAcademicDepartments
);

route.get(
    '/:id',
    academicDepartmentController.getSingleAcademicDepartment
);

route.patch(
    '/:id',
    validateRequest(academicDepartmentValidation.updateAcademicDepartmentValidation),
    academicDepartmentController.updateAcademicDepartment
);

route.delete(
    '/:id',
    academicDepartmentController.deleteAcademicDepartment
);

export const academicDepartmentRoutes = route;