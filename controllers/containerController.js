const res = require('express/lib/response')
const Container = require('../models/Container')
const TrackingStep = require('../models/TrackingStep')


const trackingStepCreate = (req, res) => {

    const containerId = req.params.id

    const trackingStep = new TrackingStep({
        name: req.body.name,
        container: containerId
    })

    trackingStep.save()
        .then(result => res.status(201).json(result))
        .catch(err => {
            res.status(500).json({'message':err})
        })
}


const updateTrackingStep = (req, res,next) => {
    const containerId = req.params.containerId
    const trackingStepId = req.params.stepId

    if (req.body.hasOwnProperty('status') && req.body.status === 'Complete') {

        //get all sorted trackingsteps of the container
        TrackingStep.find({ 'container': containerId })
        .lean()
        .sort({ 'createdAt': 1 })
        .then(steps => {
            //find index of the main trackingStep
            const index = steps.findIndex(step => step._id.equals(trackingStepId))
           
            //update the next one
            if (index >= 1) {
                 //check the previous status
                if (steps[index - 1].status !== 'Complete') {
                    res.status(403)
                        .json({ 
                            'message': 'A tracking step cannot be completed if the previous step has not been completed' 
                        })
                }
                else {
                    //check if we have a next step available
                    if (index < steps.length -1) {
                        const nextStep = steps[index + 1]
                        //update the next one status to => in progress
                        TrackingStep.findOneAndUpdate({_id :nextStep._id.toString()},{ $set:{'status': 'In-Progress'}})
                            .then(result => {
                                return TrackingStep.findByIdAndUpdate(trackingStepId, req.body)
                            })
                            .then(result => {
                                console.log("updated resource result ready")
                                res.status(204).json({'message':'resource updated successfully'})
                            })
                            .catch(err => {
                                res.status(500).json({'message':err})
                            })
                    }
                    else{
                        TrackingStep.findByIdAndUpdate(trackingStepId, req.body)
                            .then(result => {
                                console.log("updated resource result ready")
                                res.status(204).json({'message':'resource updated successfully'})
                            })
                            .catch(err => {
                                res.status(500).json({'message':err})
                            })
                       
                    }
                }

            }
            else{//just one element
                TrackingStep.findByIdAndUpdate(trackingStepId, req.body)
                    .then(result => {
                        console.log("updated resource result ready")
                        res.status(204).json({'message':'resource updated successfully'})
                    })
                    .catch(err => {
                        res.status(500).json({'message':err})
                    })
                
            }

        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
        
    }else {
        //update the main trackingStep
        TrackingStep.findByIdAndUpdate(trackingStepId, req.body)
        .then(result => {
            console.log("updated resource result ready")
            res.status(204).json({'message':'resource updated successfully'})
        })
        .catch(err => {
            res.status(500).json({'message':err})
        })
    }
}



module.exports = {
    trackingStepCreate,
    updateTrackingStep
}