import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { courseValidation } from "./course.validation";
import { CourseControllers } from "./course.controller";

const route = Router();

route.post(
    '/create-course',
    validateRequest(courseValidation.createCourseSchemaValidation),
    CourseControllers.createCourse
);

route.get(
    '/',
    CourseControllers.getAllCourses
);

route.get(
    '/:id',
    CourseControllers.getSingleCourse
);

route.patch(
    '/:id',
    validateRequest(courseValidation.updateCourseSchemaValidation),
    CourseControllers.updateCourse
);

route.delete(
    '/:id',
    CourseControllers.deleteCourse
);

route.put(
    '/:courseId/assign-faculties',
    CourseControllers.assignFacultiesWithCourse
)

export const CourseRoutes = route;