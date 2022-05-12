const express = require("express")
const router = express.Router()

const shipmentController = require('../controllers/shipmentController')
const validator = require('../utils/validator')


/**
 * @swagger
 * /shipments:
 *   get:
 *     summary: Retrieve a list of all shipments
 *     description: Retrieve a list of all shipments with their containers
 *     responses:
 *       200:
 *         description: A list of shipments
 *         content:
 *           application/json:
 *             schema:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       _id:
*                         type: String
*                         description: The shipment origin.
*                         example: "627cf3ef6c5cd2e01289948b"
*                       origin:
*                         type: String
*                         description: The shipment origin.
*                         example: "Paris" 
*                       destination:
*                         type: String
*                         description: The shipment destination.
*                         example: "Lomé"
*                       description:
*                         type: String
*                         description: Informations about the shipment.
*                         example: "lorem ipsum..."
*                       containers:
*                         type: array
*                         description: The shipment's containers.
*                         example: []
*/
router.get('/',shipmentController.shipmentIndex)



/**
 * @swagger
 * /shipments/{shipmentID}/containers:
 *   get:
 *     summary: Retrieve all containers of a shipment
 *     description: Retrieve a list of containers in a shipment
 *     parameters:
 *       - in: path
 *         name: shipmentID
 *         required: true
 *         description: ID of the shipment .
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: A list of containers
 *         content:
 *           application/json:
 *             schema:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: String
 *                         description: Container's ID.
 *                         example: "627cf3ef6c5cd2e02459948b" 
 *                       name:
 *                         type: String
 *                         description: The name of the container.
 *                         example: "ALPHA52" 
 *                       trackingSteps:
 *                         type: array
 *                         description: The list of container's differents tracking steps.
 *                         example: [] 
*/
router.get('/(:id)/containers',shipmentController.containersByShipment)

/**
 * @swagger
 * /shipments:
 *   post:
 *     summary: Create a new shipment.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              origin:
 *                   type: String
 *                   description: The shipment origin.
 *                   example: "Paris" 
 *              destination:
 *                   type: String
 *                   description: The shipment destination.
 *                   example: "Lomé"
 *              description:
 *                   type: String
 *                   description: Informations about the shipment.
 *                   example: "lorem ipsum..."
 *              containers:
 *                   type: array
 *                   description: The shipment's containers.
 *                   example: []
 *     responses:
 *       201:
 *         description: The new Shipment details
 *         content:
 *           application/json:
 *             schema:
*                     type: object
*                     properties:
*                       _id:
*                         type: String
*                         description: The shipment ID's.
*                         example: "627cf3ef6c5cd2e01289948b"
*                       origin:
*                         type: String
*                         description: The shipment origin.
*                         example: "Paris" 
*                       destination:
*                         type: String
*                         description: The shipment destination.
*                         example: "Lomé"
*                       description:
*                         type: String
*                         description: Informations about the shipment.
*                         example: "lorem ipsum..."
*                       containers:
*                         type: array
*                         description: The shipment's containers.
*                         example: []
*/
router.post('/',validator.createShipment,shipmentController.shipmentCreate)


module.exports = router;