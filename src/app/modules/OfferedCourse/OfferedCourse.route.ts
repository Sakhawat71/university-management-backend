import { Router } from "express"
import validateRequest from "../../middlewares/validateRequest";
import { offeredCourseValidation } from "./OfferedCourse.validation";
import { OfferedCourseController } from "./OfferedCourse.controller";
import authValidation from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const route = Router();

route.post(
    '/create-offered-courses',
    authValidation(
        USER_ROLE.superAdmin,
        USER_ROLE.admin,
    ),
    validateRequest(offeredCourseValidation.createOfferedCourseValidation),
    OfferedCourseController.createOfferedCourse
);

route.get(
    '/',
    authValidation(
        USER_ROLE.superAdmin,
        USER_ROLE.admin,
        USER_ROLE.faculty,
        USER_ROLE.student,
    ),
    OfferedCourseController.getAllOfferedCourse
);

// my offered course
route.get(
    '/my-offered-courses',
    authValidation(USER_ROLE.student),
    OfferedCourseController.getMyOfferedCourse
);

route.get(
    '/:id',
    authValidation(
        USER_ROLE.superAdmin,
        USER_ROLE.admin,
        USER_ROLE.faculty,
        USER_ROLE.student,
    ),
    OfferedCourseController.getSingleOfferedCourse
);

route.patch(
    '/:id',
    authValidation(
        USER_ROLE.superAdmin,
        USER_ROLE.admin
    ),
    validateRequest(offeredCourseValidation.updateOfferedCourseValidation),
    OfferedCourseController.updateOfferedCourse
);

route.delete(
    '/:id',
    authValidation(
        USER_ROLE.superAdmin,
        USER_ROLE.admin
    ),
    OfferedCourseController.deleteOfferedCourse
);

export const offeredCourseRoute = route;