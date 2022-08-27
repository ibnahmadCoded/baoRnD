const asyncHandler = require('express-async-handler')
const Email = require('../models/newslettersignupModel')
const Metric = require("../models/metricModel")

// desc:  this function gets newsletter signup emails from the db
// route: GET /api/newslettersignups
// access Private
const getEmails = asyncHandler(async (req, res) => {
    const emails =  await Email.find()

    res.status(200).json(emails)
})

// desc:  this function adds newsletter signup emails to the db
// route: POST /api/newslettersignups
// access Private
const saveEmails = asyncHandler(async (req, res) => {
    const email = req.body.email

    // check if user exists
    const userExists = await Email.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('Email already exists in Newsletter Signups List.')
    }

    if(!req.body.email){
        // check if there is a query
        res.status(400)
        throw new Error('Please add an email')
    }

    const e = await Email.create({
        email: req.body.email,
    })
    
    // update metric
    const m = await Metric.findOne() 

    await Metric.findByIdAndUpdate(m._id, {newslettersignups: m.newslettersignups + 1}, {
        new: true,
    })

    res.status(200).json(e)
})

module.exports = {
    getEmails,
    saveEmails,
}