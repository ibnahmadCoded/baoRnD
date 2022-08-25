const asyncHandler = require('express-async-handler')
const UserFeedback = require('../models/userFeedbackModel')

// desc:  this function gets feedbacks from the db
// route: GET /api/userfeedback/
// access Private
const getUserFeedback = asyncHandler(async (req, res) => {
    const userfeedback =  await UserFeedback.find()

    res.status(200).json(userfeedback)
})

// desc:  this function adds feedback to the db
// route: POST /api/userfeedback/
// access Private
const saveUserFeedback = asyncHandler(async (req, res) => {
    if(!req.body.feedback){
        // check if there is a query
        res.status(400)
        throw new Error('Please add a feedback')
    }

    const userF = await UserFeedback.find({user: req.user.id, feedback: req.body.feedback})

    console.log(userF)

    if(userF.length > 0) {
        const f = await UserFeedback.findByIdAndUpdate(userF[0]._id, {status: req.body.status}, {
            new: true,
        })

        res.status(200).json(f)
    }

        
    // if it does not exist already, we create a new entry
    if(userF.length === 0) {
        const f = await UserFeedback.create({
            user: req.user.id,
            feedback: req.body.feedback,
            status: req.body.status
        })

        res.status(200).json(f)
    }
})

// desc:  this function upvotes a feedback 
// route: PUT /api/userfeedback/:id
// access Private
const saveStatus = asyncHandler(async (req, res) => {
    const uF = await UserFeedback.findById(req.params.id)

    console.log(req.user.id)

    if(uF.user.toString() !== req.user.id){
        res.status(400)
        throw new Error('User not authorized')
    }

    const updatedUserFeedback = await UserFeedback.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
    })

    res.status(200).json(updatedUserFeedback)
})

module.exports = {
    getUserFeedback,
    saveUserFeedback,
    saveStatus,
}