const express = require('express');
const router = express.Router();

const containerController = require('../controllers/containerController')


/**
 * Update a container tracking step
 */
router.put('/(:containerId)/trackingsteps/(:stepId)',containerController.updateTrackingStep);

/***
 * Add a new tracking Step
 */
router.post('/(:id)/trackingsteps',containerController.trackingStepCreate);


module.exports = router;
