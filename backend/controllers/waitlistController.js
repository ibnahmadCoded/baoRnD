const asyncHandler = require('express-async-handler')
const Email = require('../models/waitlistModel')
const User = require('../models/userModel')
const Referral = require("../models/referralModel")
const { mailTransport, generateWaitlistEmailTemplate } = require('../utils/mailtoken')

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

// desc:    Send signup email.  
// route:   POST /api/waitlist/sendemail
// access:  Private 
// dev:     Aliyu A.   
const sendEmail = asyncHandler(async (req, res) => {
    if(!req.body.limit){
        res.status(400)
        throw new Error('Please provide the number of signup emails you want to send')
    }

    // get unsigned up emails
    const emails = await Email.find({signedup: false}).limit(req.body.limit)

    for (var i = 0; i < emails.length; i++) {
        const userExists = await User.findOne({email: emails[i].email})

        if(userExists){
            res.status(400)
            throw new Error('User already exists')
        }

        // create a referral for the user. This is cos we will use the referralsignup route to register the user. 
        // no need to reinvent the wheel. 
        const referral = await Referral.create({
            user: req.user.id,  // only the admin user can do this.
            email: emails[i].email,
            type: "Waitlist",
            joined: false
        })

        // send the email
        if(referral){
            // send referral email to the user again
            mailTransport().sendMail({
                from: 'waitlistsignups@bd.com',
                to: emails[i].email,
                subject: 'baoRnD SignUp Link',
                html: generateWaitlistEmailTemplate(`http://localhost:3000/registerwithreferral?id=${referral._id}`)
            })
        }

        // update the waitlist collection to show the user has created an account (sent the signup link)
        await Email.findByIdAndUpdate(emails[i]._id, {signedup: true}, {
            new: true,
        })  
    }

    res.status(200).json("Signup links sent to the emails")
})


// Add controller function to get emails not yet sent signup link, and then change the signed up to true. Copy similar function from referral controller

module.exports = {
    getEmails,
    saveEmails,
    sendEmail
}