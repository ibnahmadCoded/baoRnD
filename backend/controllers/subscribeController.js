const asyncHandler = require('express-async-handler')
const Metric = require("../models/metricModel")
const Sub = require('../models/subscribeModel')

// desc:    Get all tags for a project.  
// route:   GET /api/subcribe
// access:  Private 
// dev:     Aliyu A.   
const subscribe = asyncHandler(async (req, res) => {
    if(!req.body.price){
        res.status(400)
        throw new Error('Please provide the price')
    }
    
    const sub = await Sub.create({
        price: req.body.price
    })

    const m = await Metric.findOne() 

    await Metric.findByIdAndUpdate(m._id, {subscriptions: m.subscriptions + 1, subscriptionsamount: m.subscriptionsamount + parseInt(req.body.price)}, {
        new: true,
    })

    res.status(200).json(sub)
    
})

module.exports = {
    subscribe
}