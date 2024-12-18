import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { SemesterRegistrationValidation } from "./semesterRegistration.validation";
import { semesterRegistrationController } from "./semesterRegistration.controller";

const route = Router();

route.post(
    '/create-semester-registration',
    validateRequest(SemesterRegistrationValidation.createSemesterRegistrationSchemaValidation),
    semesterRegistrationController.createSemesterRegistration
)

export const SemesterRegistrationRoute = route;