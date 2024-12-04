import { Router } from "express";
import { academicSemesterController } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterValidation } from "./academicSemester.validation";

const router = Router();

router.post('/create-academic-semester',
    validateRequest(AcademicSemesterValidation.createAcademicSemesterValidation),
    academicSemesterController.createAcademicSemester);


export const academicSemesterRouters = router;