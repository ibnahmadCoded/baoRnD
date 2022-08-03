const asyncHandler = require('express-async-handler')
const Metric = require('../models/yearlymetricModel')

// desc:  this function gets all daily metrics from the db
// route: GET /api/dailymetrics
// access Private
const getMetrics = asyncHandler(async (req, res) => {
    const metrics =  await Metric.find()

    res.status(200).json(metrics)
})

// desc:  this function adds daily metrics to the db collection
// route: POST /api/dailymetrics
// access Private
const addMetrics = asyncHandler(async (req, res) => {
    if(!req.body.metrics){
        res.status(400)
        throw new Error('Please provide the metrics for the day')
    }

    const dm = await Metric.create({
        metrics: req.body.metrics
    })  

    res.status(200).json(dm)

})

module.exports = {
    getMetrics,
    addMetrics,
}