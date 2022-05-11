const express = require("express")
const router = express.Router()

const shipmentController = require('../controllers/shipmentController')

/**
 * GET all shipments
 */
router.get('/',shipmentController.shipmentIndex)

module.exports = router;