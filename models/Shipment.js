const  mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shipmentSchema = new Schema({
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    containers : [
        {type: mongoose.Schema.Types.ObjectId, ref:'Container'}
    ]
},{ timestamps: true });

const Shipment = mongoose.model('Shipment',shipmentSchema)


module.exports = Shipment;