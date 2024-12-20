import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminControllers } from './admin.controller';
import { updateAdminValidationSchema } from './admin.validation';
import authValidation from '../../middlewares/auth';

const router = express.Router();

router.get(
    '/',
    // authValidation(),
    AdminControllers.getAllAdmins);

router.get('/:id', AdminControllers.getSingleAdmin);

router.patch(
    '/:id',
    validateRequest(updateAdminValidationSchema),
    AdminControllers.updateAdmin,
);

router.delete('/:adminId', AdminControllers.deleteAdmin);

export const AdminRoutes = router;