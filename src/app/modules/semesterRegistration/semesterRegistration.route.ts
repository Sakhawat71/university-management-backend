import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { SemesterRegistrationValidation } from "./semesterRegistration.validation";
import { semesterRegistrationController } from "./semesterRegistration.controller";
import authValidation from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const route = Router();

route.post(
    '/create-semester-registration',
    authValidation(
        USER_ROLE.superAdmin,
        USER_ROLE.admin
    ),
    validateRequest(SemesterRegistrationValidation.createSemesterRegistrationSchemaValidation),
    semesterRegistrationController.createSemesterRegistration
);

route.get(
    '/',
    authValidation(
        USER_ROLE.superAdmin,
        USER_ROLE.admin,
        USER_ROLE.faculty,
        USER_ROLE.student,
    ),
    semesterRegistrationController.getAllSemesterRegistration
);

route.get(
    "/:id",
    authValidation(
        USER_ROLE.superAdmin,
        USER_ROLE.admin,
        USER_ROLE.faculty,
        USER_ROLE.student,
    ),
    semesterRegistrationController.getSingelSemesterRegistration
);

route.patch(
    '/:id',
    authValidation(
        USER_ROLE.superAdmin,
        USER_ROLE.admin
    ),
    validateRequest(SemesterRegistrationValidation.updateSemesterRegistrationSchemaValidation),
    semesterRegistrationController.updateSemesterRegistration
)
export const SemesterRegistrationRoute = route;