const { body } = require('express-validator');

const createShipment = [
    body('origin').notEmpty(),
    body('destination').notEmpty(),
    body('description').notEmpty(),
    body('containers').notEmpty().isArray(),
]


module.exports = {
    createShipment,
}