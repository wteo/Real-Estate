import express from 'express';

import regionsController from '../controllers/regions.js';

const router = express.Router();

router.use('/', regionsController.getStates);

router.get('/results', regionsController.getSearchResults);

router.get('/', regionsController.getRegions);

router.get('/:region', regionsController.getSelectedRegion);

export default router;
