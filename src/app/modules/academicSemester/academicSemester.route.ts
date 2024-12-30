import { Router } from "express";
import { academicSemesterController } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterValidation } from "./academicSemester.validation";
import authValidation from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post(
    '/create-academic-semester',
    authValidation(
        USER_ROLE.superAdmin,
        USER_ROLE.admin
    ),
    validateRequest(AcademicSemesterValidation.createAcademicSemesterValidation),
    academicSemesterController.createAcademicSemester
);

router.get(
    '/',
    authValidation(
        USER_ROLE.superAdmin,
        USER_ROLE.admin,
        USER_ROLE.faculty,
        USER_ROLE.student,
    ),
    academicSemesterController.getAllAcademicSemesters
);

router.get(
    '/:id',
    authValidation(
        USER_ROLE.superAdmin,
        USER_ROLE.admin,
        USER_ROLE.faculty,
        USER_ROLE.student
    ),
    academicSemesterController.getSingleAcademicSemester
);

router.patch(
    '/:id',
    authValidation(
        USER_ROLE.superAdmin,
        USER_ROLE.admin
    ),
    validateRequest(AcademicSemesterValidation.updateAcademicSemesterValidation),
    academicSemesterController.updaetAcademicSemester
);


export const academicSemesterRouters = router;