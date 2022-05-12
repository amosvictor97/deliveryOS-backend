const express = require('express');
const router = express.Router();

const containerController = require('../controllers/containerController')


/**
 * @swagger
 * /containers/{containerId}/trackingsteps/{trackingStepId}:
 *   put:
 *     summary: Update a tracking step.
 *     parameters:
 *       - in: path
 *         name: containerId
 *         required: true
 *         description: ID of the associated container.
 *         schema:
 *           type: String
 *       - in: path
 *         name: tarackingStepId
 *         required: true
 *         description: ID of the tracking Step you want to update.
 *         schema:
 *           type: String
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              name:
 *                   type: String
 *                   description: Tracking Step name
 *                   example: "OnBoarding" 
 *              status:
 *                   type: String
 *                   description: The Tracking Step Status (Not Started, In-Progress, Complete).
 *                   example: "Not Started" 
 *              completed_at:
 *                   type: Date
 *                   description: Completion date.
 *                   example: "Not Started"
 *              container:
 *                   type: String
 *                   description: Associated container ID.
 *                   example: "627cf3ef6c5cd2e01289948b"
 *     responses:
 *       204:
 *         description: The new Tracking Step details
 *         content:
 *           application/json:
 *             schema:
*                     type: object
*                     properties:
*                       _id:
*                         type: String
*                         description: tracking Step Identifier.
*                         example: "627cf3ef6c5cd2e01289948b"
*                       status:
*                         type: String
*                         description: Tracking System Status(Not Started, In-Progress, Complete).
*                         example: "Paris" 
*                       completed_at:
*                         type: Date
*                         description: Date when the status is changed to Complete.
*                         example: "Paris" 
*                       container:
*                         type: String
*                         description: Associated Container ID.
*                         example: "627cf3ef6c5cd2e01289948b"
*/
router.put('/(:containerId)/trackingsteps/(:stepId)',containerController.updateTrackingStep);



/**
 * @swagger
 * /containers/{containerId}/trackingsteps:
 *   post:
 *     summary: Create a new tracking step.
 *     parameters:
 *       - in: path
 *         name: containerId
 *         required: true
 *         description: ID of the associated container.
 *         schema:
 *           type: String
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              name:
 *                   type: String
 *                   description: Tracking Step name
 *                   example: "OnBoarding" 
 *              status:
 *                   type: String
 *                   description: Tracking Step Status (Not Started, In-Progress, Complete).
 *                   example: "Not Started"
 *              container:
 *                   type: String
 *                   description: Associated container ID.
 *                   example: "627cf3ef6c5cd2e01289948b"
 *     responses:
 *       200:
 *         description: The new Tracking Step details
 *         content:
 *           application/json:
 *             schema:
*                     type: object
*                     properties:
*                       _id:
*                         type: String
*                         description: tracking Step Identifier.
*                         example: "627cf3ef6c5cd2e01289948b"
*                       status:
*                         type: String
*                         description: Tracking System Status(Not Started, In-Progress, Complete).
*                         example: "Paris" 
*                       completed_at:
*                         type: Date
*                         description: Date when the status is changed to Complete.
*                         example: "Paris" 
*                       container:
*                         type: String
*                         description: Associated Container ID.
*                         example: "627cf3ef6c5cd2e01289948b"
*/
router.post('/(:id)/trackingsteps',containerController.trackingStepCreate);


module.exports = router;
