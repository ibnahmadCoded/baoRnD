const asyncHandler = require('express-async-handler')
const Email = require('../models/waitlistModel')
const User = require('../models/userModel')

// desc:  this function gets waitlist from the db
// route: GET /api/waitlist
// access Private
const getEmails = asyncHandler(async (req, res) => {
    const emails =  await Email.find()

    res.status(200).json(emails)
})

// desc:  this function adds email to waitlist collection in db
// route: POST /api/waitlist
// access Private
const saveEmails = asyncHandler(async (req, res) => {
    const email = req.body.email

    // check if user exists
    const checkUser = await User.findOne({email})

    if(checkUser){
        res.status(400)
        throw new Error('Sorry, a user has signed up with this email.')
    }

    // check that this user has not signed up (not with this email at least)
    const userExists = await Email.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('Email already exists in Waitlist. We will send you a signup link shortly')
    }

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

// Add controller function to get emails not yet sent signup link, and then change the signed up to true. Copy similar function from referral controller

module.exports = {
    getEmails,
    saveEmails,
}