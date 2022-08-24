const asyncHandler = require('express-async-handler')

const Request = require("../models/requestModel")
const Project = require('../models/projectModel')
const Stake = require('../models/stakeholderModel')
const Notification = require('../models/notificationModel')
const User = require('../models/userModel')
const Metric = require("../models/metricModel")

// desc:    Get all requests for aproject
// route:   GET /api/request/:project
// access:  Private 
// dev:     Aliyu A.   
const getProjectRequests = asyncHandler(async (req, res) => {
    const requests = await Request.find({ project: req.params.project })

    res.status(200).json(requests)
    
})

// desc:    Get all requests of a user
// route:   GET /api/request
// access:  Private 
// dev:     Aliyu A.   
const getMyRequests = asyncHandler(async (req, res) => {
    const requests = await Request.find({ user: req.user.id })

    res.status(200).json(requests)
    
})

// desc:    Add a request .
// route:   POST /api/request
// access:  Private 
// dev:     Aliyu A.   
const addRequest = asyncHandler(async (req, res) => {
    if(!req.body.project){
        res.status(400)
        throw new Error('Please provide project')
    }

    if(!req.body.type){
        res.status(400)
        throw new Error('Please provide request type')
    }

    if(!req.body.to){
        res.status(400)
        throw new Error('Please provide the user receiving the request')
    }

    if(!req.body.message){
        res.status(400)
        throw new Error('Please provide the request message')
    }

    if(req.body.type === "Payment"){
        if(!req.body.amount){
            res.status(400)
            throw new Error('Please provide the payment amount')
        }
    }

    const user = await User.findById(req.user.id)

    const toUser = await User.findById(req.body.to)

    const project = await Project.findById(req.body.project)

    const stake = await Stake.findOne({ user: req.user.id, project: req.body.project })
    
    // only a stakeholder in a project can make a request in it
    if(!stake){
        res.status(401)
        throw new Error('User not authorized')
    }

    // we create the request
    const request = await Request.create({
        user: req.user.id,
        to: req.body.to,
        project: req.body.project,
        type: req.body.type,
        username: user.name,
        toname: toUser.name,
        projectname: project.title,
        requestMsg: req.body.message,
        amount: req.body.amount,
        replied: false,
        reply: req.body.reply
    })

    // notify the user who owns (initiated) the project about the application
    // get the project
    await Notification.create({
        user: request.user,
        item: request.project,
        type: "Request",
        seen: false,
    })

    // update metric
    const m = await Metric.findOne()

    var amount = 0

    if(req.body.amount) {
        amount = request.amount
    }
            
    await Metric.findByIdAndUpdate(m._id, {$set: {
        "requests": m.requests + 1,
        "requestamount": m.requestamount + (amount), }}, {
        new: true,
    })

    res.status(200).json(request)  
})

// desc:    Add a request as repleid or not, and add the reply message.
// route:   PUT /api/request/:id
// access:  Private 
// dev:     Aliyu A.   
const updateRequest = asyncHandler(async (req, res) => {
    const request = await Request.findById(req.params.id)

    if(!req.body.reply){
        res.status(400)
        throw new Error('Request reply is absent')
    }

    if(!request){
        res.status(400)
        throw new Error('Request does not exist')
    }

    // Only the user who received a request can update it with a reply
    if(req.user.id !== request.to.toString()){
        res.status(400)
        throw new Error('User not authorized')
    }

    const updatedRequest = await Request.findByIdAndUpdate(req.params.id, {$set: {
        "reply": req.body.reply,
        "replied": true }}, {
        new: true,
    })

    // add stakeholder to project 
    const project = await Project.findById(updatedRequest.project)

    await Notification.create({
        user: req.user.id,
        item: project._id,
        type: "RequestReply",
        seen: false,
    })

    // update metric
    const m = await Metric.findOne()

    await Metric.findByIdAndUpdate(m._id, {$set: {
        "requestreplies": m.requestreplies + 1, }}, {
        new: true,
    })

    res.status(200).json(updatedRequest) 
})

// desc:    Delete a request
// route:   DELETE /api/request/:id
// access:  Private
// dev:     Aliyu A.   
const deleteRequest = asyncHandler(async (req, res) => {
    const request = await Request.findById(req.params.id)

    if(!request){
        res.status(400)
        throw new Error('Request does not exist')
    }

    // Only the sender of the reequest can delete it
    if(req.user.id !== request.user.toString()){
        res.status(400)
        throw new Error('User not Authorized')
    }

    await request.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    addRequest,
    getMyRequests,
    getProjectRequests, 
    deleteRequest,
    updateRequest
}