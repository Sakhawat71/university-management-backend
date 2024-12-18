import { Router } from "express"
import validateRequest from "../../middlewares/validateRequest";
import { offeredCourseValidation } from "./OfferedCourse.validation";
import { OfferedCourseController } from "./OfferedCourse.controller";

const route = Router();

route.post(
    '/create-offered-courses',
    validateRequest(offeredCourseValidation.createOfferedCourseValidation),
    OfferedCourseController.createOfferedCourse
);

route.get(
    '/',
    OfferedCourseController.getAllOfferedCourse
);

route.get(
    '/:id',
    OfferedCourseController.getSingleOfferedCourse
);

route.patch(
    '/:id',
    validateRequest(offeredCourseValidation.updateOfferedCourseValidation),
    OfferedCourseController.updateOfferedCourse
);

export const offeredCourseRoute = route;