const asyncHandler = require('express-async-handler')
const Feedback = require('../models/feedbackModel')

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

    res.status(200).json(f)
})

module.exports = {
    getFeedbacks,
    saveFeedback,
}