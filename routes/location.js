import express from 'express';

import locationsController from '../controllers/locations.js';
import CSRFProtection from '../middlewares/csrf_protection.js';

const router = express.Router();

router.get('/:region/:location', locationsController.getSelectedLocation);

router.post('/:region/:location/admin/delete', CSRFProtection.verifyCSRFToken, locationsController.deleteAmenity);

router.post('/:region/:location/admin/submit-amenity-form', CSRFProtection.verifyCSRFToken, locationsController.addAmenity);

router.post('/:region/:location/:amenity/admin/update', CSRFProtection.verifyCSRFToken, locationsController.updateAmenity);

export default router;
