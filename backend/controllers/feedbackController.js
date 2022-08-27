const asyncHandler = require('express-async-handler')
const Feedback = require('../models/feedbackModel')
const UserFeedback = require('../models/userFeedbackModel')
const Metric = require("../models/metricModel")

// desc:  this function gets feedbacks from the db
// route: POST /api/feedbacks/
// access Private
const getFeedbacks = asyncHandler(async (req, res) => {
    const feedbacks =  await Feedback.find()

    res.status(200).json(feedbacks)
})

// desc:  this function adds feedback to the db
// route: POST /api/feedbacks/
// access Private
const saveFeedback = asyncHandler(async (req, res) => {
    if(!req.body.feedback){
        // check if there is a query
        res.status(400)
        throw new Error('Please add a feedback')
    }

    const f = await Feedback.create({
        user: req.user.id,
        feedback: req.body.feedback,
    })

    // create userfeedback 
    const userF = await UserFeedback.find({user: req.user.id, feedback: f._id})

    // if it does not exist already, we create a new entry
    if(userF.length === 0) {
        await UserFeedback.create({
            user: req.user.id,
            feedback: f._id,
            status: false,
        })
    }

    // update metric
    const m = await Metric.findOne() 

    await Metric.findByIdAndUpdate(m._id, {feedbacks: m.feedbacks + 1}, {
        new: true,
    })

    res.status(200).json(f)
})

// desc:  this function upvotes a feedback 
// route: PUT /api/feedbacks/:id
// access Private
const upvoteFeedback = asyncHandler(async (req, res) => {
    const uF = await Feedback.findById(req.params.id)

    if(!uF){
        res.status(400)
        throw new Error('Feedback does not exist')
    }

    if(req.body.upvote === "true"){
        // upvote
        const upvotedFeedback = await Feedback.findByIdAndUpdate(req.params.id, {$set: {
            "upvotes": uF.upvotes + 1 }}, {
            new: true,
        })

        // update the userfeedback or create a new one
        const userF = await UserFeedback.find({user: req.user.id, feedback: req.params.id})
        
        if(userF.length > 0) {
            await UserFeedback.findByIdAndUpdate(userF[0]._id, {$set: {
                "status": true }}, {
                new: true,
            })
        }

        res.status(200).json(upvotedFeedback)
    }

    if(req.body.upvote === "false") {
        // downvote
        const upvotedFeedback = await Feedback.findByIdAndUpdate(req.params.id, {$set: {
            "upvotes": uF.upvotes - 1 }}, {
            new: true,
        })

        // update the userfeedback or create a new one
        const userF = await UserFeedback.find({user: req.user.id, feedback: req.params.id})
        if(userF.length > 0) {
            await UserFeedback.findByIdAndUpdate(userF[0]._id, {$set: {
                "status": false }}, {
                new: true,
            })
        }

        res.status(200).json(upvotedFeedback)
    }
})

// desc:  this function upvotes a feedback 
// route: PUT /api/feedback/update/:id
// access Private
const updateFeedback = asyncHandler(async (req, res) => {
    const uF = await Feedback.findById(req.params.id)

    if(!uF){
        res.status(400)
        throw new Error('Feedback does not exist')
    }

    
    // update
    const updatedFeedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })

    res.status(200).json(updatedFeedback)
})

module.exports = {
    getFeedbacks,
    saveFeedback,
    upvoteFeedback,
    updateFeedback,
}