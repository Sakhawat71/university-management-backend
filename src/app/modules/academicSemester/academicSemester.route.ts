import { Router } from "express";
import { academicSemesterController } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterValidation } from "./academicSemester.validation";

const router = Router();

router.post(
    '/create-academic-semester',
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