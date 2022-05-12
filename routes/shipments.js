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
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
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
 * GET 
 */
router.get('/(:id)/containers',shipmentController.containersByShipment)

/**
 * Create new shipment
 */
router.post('/',validator.createShipment,shipmentController.shipmentCreate)


module.exports = router;