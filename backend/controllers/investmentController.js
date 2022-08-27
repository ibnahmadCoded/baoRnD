const asyncHandler = require('express-async-handler')

const Investment = require('../models/investmentModel')
const Project = require('../models/projectModel')
const Stake = require('../models/stakeholderModel')
const Notification = require('../models/notificationModel')
const User = require("../models/userModel")
const Metric = require("../models/metricModel")

// desc:    Get all investments of a user.  Can filter for the particular project if we want to show investment of user in a particular project
// route:   GET /api/investments
// access:  Private 
// dev:     Aliyu A.   
const getMyInvestments = asyncHandler(async (req, res) => {
    const investments = await Investment.find({ user: req.user.id })

    res.status(200).json(investments)
    
})

// desc:    Get all investments on a project.  Only the initiator of a project can use this route to see all investments on a project.
// route:   GET /api/investments/projectinvestments/:project
// access:  Private 
// dev:     Aliyu A.   
const getProjectInvestments = asyncHandler(async (req, res) => {
    if(!req.params.project){
        res.status(400)
        throw new Error('Please provide project')
    }

    // get the project
    const project = await Project.findById(req.params.project)

    if(!project){
        res.status(400)
        throw new Error('Project does not exist')
    }

    // only the initiator of a project can view all investments in it
    // get stakeholder of the project, where user matches project
    const stake = await Stake.findOne({ user: req.user.id, project: req.params.project, type: { "$in" : ["Initiator"]} })

    if(!stake){
        res.status(400)
        throw new Error('User not authorized')
    }

    const investments = await Investment.find({ project: req.params.project })

    res.status(200).json(investments)
    
})

// desc:    Add investment of a user.  
// route:   POST /api/investments
// access:  Private 
// dev:     Aliyu A.   
// note:    Updates the stakeholders collection also. It adds the investor stake for user on the project or creates one 
            //  if no stake found for user on the project 
const addInvestment = asyncHandler(async (req, res) => {
    if(!req.body.project){
        res.status(400)
        throw new Error('Please provide project')
    }

    if(!req.body.amount){
        res.status(400)
        throw new Error('Please provide amount')
    }
    
    // get investment of user in project to check if user already exists for the project, 
    // i.e. already invested in it before. We dont want to duplicate users in this collection
    const i = await Investment.findOne({ user: req.user.id, project: req.body.project })

    // get the project, user and metrics
    const project = await Project.findById(req.body.project)
    const user = await User.findById(req.user.id)
    const m = await Metric.findOne() 

    if (i){
        // if the user already exists with investments on project in the collection, just update it with the additional amounts
        const investment = await Investment.findByIdAndUpdate(i._id, {$push: {amounts: req.body.amount}}, {
            new: true,
        })

        // notify the project owner about investment
        await Notification.create({
            user: project.user,
            item: project._id,
            type: "Investment",
            seen: false,
        })

        // add metric 
        // set the new maximum investment amount
        max_amount = parseInt(m.investments.MaxAmount)
        
        if(max_amount < parseInt(req.body.amount)){
            max_amount = parseInt(req.body.amount)
        }
        
        await Metric.findByIdAndUpdate(m._id, {$set: {
            "investments.TotalInventment": m.investments.TotalInventment + 1,
            "investments.TotalAmount": parseInt(m.investments.TotalAmount) + parseInt(req.body.amount), 
            "investments.MaxAmount": max_amount,}}, {
            new: true,
        })

        res.status(200).json(investment)
    }
    else
    {
        // else we create a new investment entry for the user on the project, in the collection
        const investment = await Investment.create({
            user: req.user.id,
            username: user.name,
            project: req.body.project,
            projectname: project.title,
            amounts: req.body.amount
        })

        // add metric 
        // set the new maximum investment amount
        max_amount = parseInt(m.investments.MaxAmount)
        
        if(max_amount < parseInt(req.body.amount)){
            max_amount = parseInt(req.body.amount)
        }
        
        await Metric.findByIdAndUpdate(m._id, {$set: {
            "investments.TotalInventment": m.investments.TotalInventment + 1,
            "investments.TotalAmount": parseInt(m.investments.TotalAmount) + parseInt(req.body.amount), 
            "investments.MaxAmount": max_amount,}}, {
            new: true,
        })

        // after creation, add Investor status to stakeholders collection for the user on the project
        const s = await Stake.findOne({ user: req.user.id, project: req.body.project }) 
        
        if (s){
            // if the user already exists with investment stake on project in the collection, just update it with the investor stake
            await Stake.findByIdAndUpdate(s._id, {$addToSet: {type: "Investor"}}, {
                new: true,
            })

            // add metric
            await Metric.findByIdAndUpdate(m._id, {$set: {
                "stakeholders.Total": m.stakeholders.Total + 1,
                "stakeholders.Investor": m.stakeholders.Investor + 1, }}, {
                new: true,
            })
        }
        else{
            await Stake.create({
                user: req.user.id,
                username: user.name,
                project: req.body.project,
                type: "Investor",
                viewership: false
            })

            // add metric
            await Metric.findByIdAndUpdate(m._id, {$set: {
                "stakeholders.Total": m.stakeholders.Total + 1,
                "stakeholders.Investor": m.stakeholders.Investor + 1, }}, {
                new: true,
            })
        }

        // notify the project owner about investment
        // get the project
        await Notification.create({
            user: project.user,
            item: project._id,
            type: "Investment",
            seen: false,
        })

        res.status(200).json(investment)
    }
    
})

module.exports = {
    addInvestment,
    getMyInvestments,
    getProjectInvestments,
}