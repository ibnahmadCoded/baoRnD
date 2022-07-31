const asyncHandler = require('express-async-handler')
const Email = require('../models/newslettersignupModel')

// desc:  this function gets feedbacks from the db
// route: POST /api/feedbacks/
// access Private
const getEmails = asyncHandler(async (req, res) => {
    const emails =  await Email.find()

    res.status(200).json(emails)
})

// desc:  this function adds feedback to the db
// route: POST /api/feedbacks/
// access Private
const saveEmails = asyncHandler(async (req, res) => {

    if(!req.body.email){
        // check if there is a query
        res.status(400)
        throw new Error('Please add an email')
    }

    const e = await Email.create({
        email: req.body.email,
    })

    res.status(200).json(e)
})

module.exports = {
    getEmails,
    saveEmails,
}