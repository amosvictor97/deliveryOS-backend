const  mongoose = require("mongoose");
const Schema = mongoose.Schema

const containerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    trackings : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'TrackingStep'
        }
    ]
});

const Container = mongoose.model('Container',containerSchema);


module.exports = Container;