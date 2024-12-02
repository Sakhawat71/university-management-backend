import { Router } from "express";
import { studentRouter } from "../modules/student/student.route";
import { userRouter } from "../modules/user/user.route";

const router = Router();

const routersModule = [
    {
        path: "/students",
        route: studentRouter,
    },
    {
        path: "/users",
        route: userRouter,
    },
]

routersModule.forEach((r) => router.use(r.path, r.route));

export default router;