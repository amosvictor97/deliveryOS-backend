const { body } = require('express-validator');

const createShipment = [
    body('origin').notEmpty().withMessage("origin cannot be empty"),
    body('destination').notEmpty().withMessage("destination cannot be empty"),,
    body('description').notEmpty().withMessage("description cannot be empty"),,
    body('containers').notEmpty().withMessage("containers cannot be empty").isArray(),
]


module.exports = {
    createShipment,
}