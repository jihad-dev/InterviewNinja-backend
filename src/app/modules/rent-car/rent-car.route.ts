// rent-car.route.ts
import { Router } from 'express';
import { RentCarController } from './rent-car.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { RentCarValidation } from './rent-car.validation';

const router = Router();

// Public
router.get('/', RentCarController.getAllRentCars);
router.get('/:id', RentCarController.getSingleRentCar);
router.patch('/:id/status', RentCarController.updateStatus); // ইউজার status update

// Admin only
router.post(
    '/add-car',
    auth(['admin', 'superAdmin']),
    validateRequest(RentCarValidation.createRentCarSchema),
    RentCarController.createRentCar
);
router.patch(
    '/:id',
    auth(['admin', 'superAdmin']),
    validateRequest(RentCarValidation.updateRentCarSchema),
    RentCarController.updateRentCar
);
router.delete(
    '/:id',
    auth(['admin', 'superAdmin']),
    RentCarController.deleteRentCar
);

export const RentCarRoutes = router;