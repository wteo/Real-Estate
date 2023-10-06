import express from 'express';

import regionsController from '../controllers/regions.js';
import CSRFProtection from '../middlewares/csrf_protection.js';

const router = express.Router();

router.get('/:region', regionsController.fetchRegion);

router.post('/admin/submit-add-region-form', CSRFProtection.verifyCSRFToken, regionsController.addRegion);

router.post('/:region/admin/submit-update-region-form', CSRFProtection.verifyCSRFToken, regionsController.updateRegion);

router.post('/admin/delete-region', CSRFProtection.verifyCSRFToken, regionsController.deleteRegion);

router.post('/admin/submit-add-location-form', CSRFProtection.verifyCSRFToken, regionsController.addLocation);

router.post('/:region/:location/admin/update', CSRFProtection.verifyCSRFToken, regionsController.updateLocation);

router.post('/:region/admin/delete', CSRFProtection.verifyCSRFToken, regionsController.deleteLocation);

export default router;
