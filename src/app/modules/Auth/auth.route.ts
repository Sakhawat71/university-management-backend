import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";
import authValidation from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";


const router = Router();

router.post(
    '/login',
    validateRequest(AuthValidation.loginValidation),
    AuthController.loginUser
);

router.post(
    '/change-password',
    authValidation(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
    validateRequest(AuthValidation.changePasswordValidation),
    AuthController.changeUserPassword
);

export const authRouter = router;