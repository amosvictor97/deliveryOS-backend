const { validationResult } = require('express-validator');
const Shipment = require('../models/Shipment')
const Container = require('../models/Container')

/**
 * List all shipments with their containers
 */
const shipmentIndex = (req, res) => {

    Shipment.find()
        .populate('containers','name')
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err))
}

const shipmentCreate = (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //create containers
    const containers = req.body.containers

    Container.insertMany(containers)
        .then(savedContainers => {
          const  containersId = savedContainers.map(c => c._id)

            //save the shipment
            let shipment = new Shipment({
                origin: req.body.origin,
                destination: req.body.destination,
                description: req.body.description,
                containers: containersId
            })
            return shipment.save()
        })
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err))     
    
}



module.exports = {
    shipmentIndex,
    shipmentCreate
}