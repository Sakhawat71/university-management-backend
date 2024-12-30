import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { courseValidation } from "./course.validation";
import { CourseControllers } from "./course.controller";
import authValidation from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const route = Router();

route.post(
    '/create-course',
    authValidation(
        USER_ROLE.superAdmin,
        USER_ROLE.admin
    ),
    validateRequest(courseValidation.createCourseSchemaValidation),
    CourseControllers.createCourse
);

route.get(
    '/',
    authValidation(
        USER_ROLE.superAdmin,
        USER_ROLE.admin,
        USER_ROLE.faculty,
        USER_ROLE.student
    ),
    CourseControllers.getAllCourses
);

route.get(
    '/:id',
    authValidation(
        USER_ROLE.superAdmin,
        USER_ROLE.admin,
        USER_ROLE.faculty,
        USER_ROLE.student
    ),
    CourseControllers.getSingleCourse
);

route.patch(
    '/:id',
    authValidation(
        USER_ROLE.superAdmin,
        USER_ROLE.admin
    ),
    validateRequest(courseValidation.updateCourseSchemaValidation),
    CourseControllers.updateCourse
);

route.delete(
    '/:id',
    authValidation(
        USER_ROLE.superAdmin,
        USER_ROLE.admin
    ),
    CourseControllers.deleteCourse
);

route.put(
    '/:courseId/assign-faculties',
    authValidation(
        USER_ROLE.superAdmin,
        USER_ROLE.admin
    ),
    validateRequest(courseValidation.courseFacultySchemaValidation),
    CourseControllers.assignFacultiesWithCourse
)

route.delete(
    '/:courseId/remove-faculties',
    authValidation(
        USER_ROLE.superAdmin,
        USER_ROLE.admin
    ),
    validateRequest(courseValidation.courseFacultySchemaValidation),
    CourseControllers.removeFacultiesFromCourse
)

export const CourseRoutes = route;