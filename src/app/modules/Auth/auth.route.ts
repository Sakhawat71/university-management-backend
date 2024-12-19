import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";


const router = Router();

router.post(
    '/login',
    validateRequest(AuthValidation.loginValidation),
    AuthController.loginUser
);

export const authRouter = router;