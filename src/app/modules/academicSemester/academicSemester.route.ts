import { Router } from "express";
import { academicSemesterController } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterValidation } from "./academicSemester.validation";
import authValidation from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post(
    '/create-academic-semester',
    authValidation(USER_ROLE.superAdmin, USER_ROLE.admin),
    validateRequest(AcademicSemesterValidation.createAcademicSemesterValidation),
    academicSemesterController.createAcademicSemester
);

router.get(
    '/',
    academicSemesterController.getAllAcademicSemesters
);

router.get(
    '/:id',
    academicSemesterController.getSingleAcademicSemester
);

router.patch(
    '/:id',
    validateRequest(AcademicSemesterValidation.updateAcademicSemesterValidation),
    academicSemesterController.updaetAcademicSemester
);


export const academicSemesterRouters = router;