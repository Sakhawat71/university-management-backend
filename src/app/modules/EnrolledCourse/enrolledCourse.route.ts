import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import authValidation from '../../middlewares/auth';
import { EnrolledCourseValidations } from './enrolledCourse.validation';
import { EnrolledCourseControllers } from './enrolledCourse.controller';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
    '/create-enrolled-course',
    authValidation(USER_ROLE.student),
    validateRequest(
        EnrolledCourseValidations.createEnrolledCourseValidationZodSchema,
    ),
    EnrolledCourseControllers.createEnrolledCourse,
);

router.patch(
    '/update-enrolled-course-marks',
    authValidation(USER_ROLE.faculty),
    validateRequest(
        EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema,
    ),
    EnrolledCourseControllers.updateEnrolledCourseMarks,
);

router.get(
    '/my-enrolled-courses',
    authValidation(USER_ROLE.student),
    EnrolledCourseControllers.getMyEnrolledCourses,
)

export const EnrolledCourseRoutes = router;