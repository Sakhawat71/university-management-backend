import { Router } from "express";
import { studentRouter } from "../modules/student/student.route";
import { userRouter } from "../modules/user/user.route";
import { academicSemesterRouters } from "../modules/academicSemester/academicSemester.route";
import { academicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { academicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";
import { FacultyRoutes } from "../modules/Faculty/faculty.route";
import { AdminRoutes } from "../modules/Admin/admin.route";
import { CourseRoutes } from "../modules/Course/course.route";
import { SemesterRegistrationRoute } from "../modules/semesterRegistration/semesterRegistration.route";
import { offeredCourseRoute } from "../modules/OfferedCourse/OfferedCourse.route";
import { authRouter } from "../modules/Auth/auth.route";

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
        path: "/academic-semester",
        route: academicSemesterRouters,
    },
    {
        path: "/academic-faculties",
        route: academicFacultyRoutes,
    },
    {
        path: "/academic-department",
        route: academicDepartmentRoutes,
    },
    {
        path: '/faculties',
        route: FacultyRoutes,
    },
    {
        path: '/admins',
        route: AdminRoutes,
    },
    {
        path: '/courses',
        route: CourseRoutes,
    },
    {
        path: '/semester-registrations',
        route: SemesterRegistrationRoute
    },
    {
        path: '/offered-courses',
        route : offeredCourseRoute
    },
    {
        path : '/auth',
        route : authRouter
    }
];

routersModule.forEach((r) => router.use(r.path, r.route));

export default router;