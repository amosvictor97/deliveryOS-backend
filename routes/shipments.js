const express = require("express")
const router = express.Router()

const shipmentController = require('../controllers/shipmentController')
const validator = require('../utils/validator')

/**
 * GET all shipments
 */
router.get('/',shipmentController.shipmentIndex)

/**
 * Create new shipment
 */
router.post('/',validator.createShipment,shipmentController.shipmentCreate)


module.exports = router;