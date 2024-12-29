import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { updateFacultyValidationSchema } from './faculty.validation';
import { FacultyControllers } from './faculty.controller';
import authValidation from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
    '/',
    authValidation(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
    FacultyControllers.getAllFaculties
);

router.get(
    '/:id',
    authValidation(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
    FacultyControllers.getSingleFaculty
);

router.patch(
    '/:id',
    authValidation(USER_ROLE.superAdmin, USER_ROLE.admin),
    validateRequest(updateFacultyValidationSchema),
    FacultyControllers.updateFaculty,
);

router.delete(
    '/:id',
    authValidation(USER_ROLE.superAdmin, USER_ROLE.admin),
    FacultyControllers.deleteFaculty
);

export const FacultyRoutes = router;