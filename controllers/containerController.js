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


const updateTrackingStep = (req, res) => {
    const containerId = req.params.containerId
    const trackingStepId = req.params.stepId

    if (req.body.status !== undefined && req.body.status === 'Complete') {
        const newStatut = req.body.status

        console.log("the new status is  -Complete")

        //get all sorted trackingsteps of the container
        TrackingStep.find({ 'container': containerId })
        .sort({ 'createdAt': 'asc' })
        .then(steps => {
            //find index of the main trackingStep
            const index = steps.findIndex(step => step._id.equals(trackingStepId))
            console.log(index)
            console.log(steps)
           
            //update the next one
            if (index >= 1) {
                console.log("index > 1")
                 //check the previous status
                if (steps[index - 1].status !== 'Complete') {
                    return res.status(403)
                        .json({ 
                            'message': 'A tracking step cannot be completed if the previous step has not been completed' 
                        })
                }
                else {
                    console.log("the previous Step status is ok")
                    //check if we have a next step available
                    if (index < steps.length -1) {
                        const nextStep = steps[index + 1]
                        //update the next one status to => in progress
                        TrackingStep.findByIdAndUpdate(nextStep._id,{ 'status': 'In-Progress'})
                            .then(result => console.log(result))
                            .catch(err => console.log(err))
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

const update = (trackingStepId,data) => {
    TrackingStep.findByIdAndUpdate(trackingStepId, data)
    .then(result => {
        console.log("updated resource result ready")
        res.status(204).json({'message':'resource updated successfully'})
    })
    .catch(err => {
        res.status(500).json({'message':err})
    })
}

module.exports = {
    trackingStepCreate,
    updateTrackingStep
}