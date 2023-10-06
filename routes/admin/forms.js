import express from 'express';

import adminFormsController from '../../controllers/admin/forms.js';
import checkAuth from '../../middlewares/is_auth.js';

const router = express.Router();

router.get('/admin/add-region-form', checkAuth, adminFormsController.getAddRegionForm);

router.get('/:region/admin/update-region-form', checkAuth, adminFormsController.getUpdateRegionForm);

router.get('/admin/add-location-form', checkAuth, adminFormsController.getAddLocationForm);

router.get('/:region/:location/admin/update-location-form', checkAuth, adminFormsController.getUpdateLocationForm);

router.get('/:region/:location/admin/add-amenity-form', checkAuth, adminFormsController.getAddAmenityForm);

router.get('/:region/:location/:amenity/admin/update-amenity-form', checkAuth, adminFormsController.getUpdateAmenityForm);

export default router;