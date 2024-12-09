import { Router } from "express";
import { studentRouter } from "../modules/student/student.route";
import { userRouter } from "../modules/user/user.route";
import { academicSemesterRouters } from "../modules/academicSemester/academicSemester.route";
import { academicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";

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
    {
        path : "/academic-semester",
        route : academicSemesterRouters,
    },
    {
        path: "/academic-faculties",
        route: academicFacultyRoutes,
    }
]

routersModule.forEach((r) => router.use(r.path, r.route));

export default router;