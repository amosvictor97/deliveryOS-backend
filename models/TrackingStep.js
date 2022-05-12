const  mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trackingStepSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Not Started', 'In-Progress', 'Complete'],
        default: 'Not Started',
    },
    completed_at: {
        type: Date,
    },
    container: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Container',
        required: 'You must provide a container ID'
    }
},{ timestamps: true });

const TrackingStep = mongoose.model('TrackingStep',trackingStepSchema)


module.exports = TrackingStep;