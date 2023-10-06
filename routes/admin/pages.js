import express from 'express';

import adminPagesController from '../../controllers/admin/pages.js';
import checkAuth from '../../middlewares/is_auth.js';

const router = express.Router();

router.get('/admin', checkAuth, adminPagesController.getMainPage); 

router.get('/:region/admin', checkAuth, adminPagesController.getRegionPage);

router.get('/:region/:location/admin', checkAuth, adminPagesController.getLocationPage);

export default router;