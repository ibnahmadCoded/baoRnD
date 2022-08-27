const asyncHandler = require('express-async-handler')

const Stakeholder = require('../models/stakeholderModel')
const User = require('../models/userModel')
const Project = require('../models/projectModel')
const Metric = require("../models/metricModel")

// desc:    Get all Stakeholders for a project. 
// route:   GET /api/stakeholders/:project
// access:  Private 
// dev:     Aliyu A.   
const getStakeholders = asyncHandler(async (req, res) => {
    if(!req.params.project){
        res.status(400)
        throw new Error('Please provide the project')
    }

    const project = await Project.findById(req.params.project)
    if(!project){
        res.status(400)
        throw new Error('Project does not exist')
    }

    const stakeholders = await Stakeholder.find({ project: req.params.project })

    res.status(200).json(stakeholders)
})

// desc:    Get stake of a user in a project. 
// route:   GET /api/stakeholders/:project
// access:  Private 
// dev:     Aliyu A.   
const getStake = asyncHandler(async (req, res) => {
    if(!req.params.project){
        res.status(400)
        throw new Error('Please provide the project')
    }

    const project = await Project.findById(req.params.project)
    if(!project){
        res.status(400)
        throw new Error('Project does not exist')
    }

    const stake = await Stakeholder.find({ project: req.params.project, user: req.user.id })

    res.status(200).json(stake[0])
})

// desc:    Add a stakeholder to a project
// route:   POST /api/stakeholders
// access:  Private
// dev:     Aliyu A.  
const addStakeholder = asyncHandler(async (req, res) => {
    if(!req.body.type){
        res.status(400)
        throw new Error('Please provide the stakeholder type')
    }

    if(!req.body.viewership){
        res.status(400)
        throw new Error('Please set the viewership status of the stakeholder')
    }

    if(!req.body.update){
        res.status(400)
        throw new Error('Please set the update status of the stakeholder')
    }

    // check that user exists
    if(!req.body.user){
        res.status(401)
        throw new Error('User does not exist in request')
    }

    // check that project exists
    if(!req.body.project){
        res.status(401)
        throw new Error('Project does not exist in request')
    }

    // get the name of the user who is the stakeholder
    stakeUser = await User.findById(req.body.user)

    const user = await User.findById(req.user.id)
    const project = await Project.findById(req.body.project)

    // check that user exists
    if(!user){
        res.status(401)
        throw new Error('User does not exist')
    }

    // check that project exists
    if(!project){
        res.status(401)
        throw new Error('Project does not exist')
    }

    // only the initiator of the project (passed as parameter) can add stakeholders (
    // supervisors, Developers, Collaborators and researchers) to the project
    // A user can follow or invest in public projects without the authorization of the initiator
    if(req.body.type === "Supervisor" || req.body.type === "Researcher" || req.body.type === "Developer" || req.body.type === "Collaborator") {
        // Check that the logged in user is the same as the project user
        if(project.user.toString() !== user.id){
            res.status(401)
            throw new Error('User not authorized')
        }
    }

    const stake = await Stakeholder.findOne({ user: req.body.user, project: req.body.project })

    const m = await Metric.findOne() 
    
    if(stake){
        // if the user item already exists with its stakes on the project in the collection, just update it with the additional stake
        const stakeholder = await Stakeholder.findByIdAndUpdate(stake._id, {
            viewership: req.body.viewership, 
            update: req.body.update,
            $addToSet: {type: req.body.type}}, {
            new: true,
        })

        // update metrics
        if(req.body.type === "Collaborator"){
            await Metric.findByIdAndUpdate(m._id, {$set: {
                "stakeholders.Total": m.stakeholders.Total + 1,
                "stakeholders.Collaborator": m.stakeholders.Collaborator + 1, }}, {
                new: true,
            })
        }

        if(req.body.type === "Supervisor"){
            await Metric.findByIdAndUpdate(m._id, {$set: {
                "stakeholders.Total": m.stakeholders.Total + 1,
                "stakeholders.Supervisor": m.stakeholders.Supervisor + 1, }}, {
                new: true,
            })
        }
    
        if(req.body.type === "Researcher"){
            await Metric.findByIdAndUpdate(m._id, {$set: {
                "stakeholders.Total": m.stakeholders.Total + 1,
                "stakeholders.Researcher": m.stakeholders.Researcher + 1, }}, {
                new: true,
            })
        }
    
        if(req.body.type === "Developer"){
            await Metric.findByIdAndUpdate(m._id, {$set: {
                "stakeholders.Total": m.stakeholders.Total + 1,
                "stakeholders.Developer": m.stakeholders.Developer + 1, }}, {
                new: true,
            })
        }

        if(req.body.type === "Initiator"){
            await Metric.findByIdAndUpdate(m._id, {$set: {
                "stakeholders.Total": m.stakeholders.Total + 1,
                "stakeholders.Initiator": m.stakeholders.Initiator + 1, }}, {
                new: true,
            })
        }
    
        if(req.body.type === "Follower"){
            await Metric.findByIdAndUpdate(m._id, {$set: {
                "stakeholders.Total": m.stakeholders.Total + 1,
                "stakeholders.Follower": m.stakeholders.Follower + 1, }}, {
                new: true,
            })
        }

        if(req.body.type === "Investor"){
            await Metric.findByIdAndUpdate(m._id, {$set: {
                "stakeholders.Total": m.stakeholders.Total + 1,
                "stakeholders.Investor": m.stakeholders.Investor + 1, }}, {
                new: true,
            })
        }

        res.status(200).json(stakeholder)
    }
    else
    {
        const stakeholder = await Stakeholder.create({
            user: req.body.user,
            username: stakeUser.name,
            project: req.body.project,
            type: req.body.type,
            viewership: req.body.viewership,
            update: req.body.update
        })

        // update metrics
        if(req.body.type === "Collaborator"){
            await Metric.findByIdAndUpdate(m._id, {$set: {
                "stakeholders.Total": m.stakeholders.Total + 1,
                "stakeholders.Collaborator": m.stakeholders.Collaborator + 1, }}, {
                new: true,
            })
        }

        if(req.body.type === "Supervisor"){
            await Metric.findByIdAndUpdate(m._id, {$set: {
                "stakeholders.Total": m.stakeholders.Total + 1,
                "stakeholders.Supervisor": m.stakeholders.Supervisor + 1, }}, {
                new: true,
            })
        }
    
        if(req.body.type === "Researcher"){
            await Metric.findByIdAndUpdate(m._id, {$set: {
                "stakeholders.Total": m.stakeholders.Total + 1,
                "stakeholders.Researcher": m.stakeholders.Researcher + 1, }}, {
                new: true,
            })
        }
    
        if(req.body.type === "Developer"){
            await Metric.findByIdAndUpdate(m._id, {$set: {
                "stakeholders.Total": m.stakeholders.Total + 1,
                "stakeholders.Developer": m.stakeholders.Developer + 1, }}, {
                new: true,
            })
        }

        if(req.body.type === "Initiator"){
            await Metric.findByIdAndUpdate(m._id, {$set: {
                "stakeholders.Total": m.stakeholders.Total + 1,
                "stakeholders.Initiator": m.stakeholders.Initiator + 1, }}, {
                new: true,
            })
        }
    
        if(req.body.type === "Follower"){
            await Metric.findByIdAndUpdate(m._id, {$set: {
                "stakeholders.Total": m.stakeholders.Total + 1,
                "stakeholders.Follower": m.stakeholders.Follower + 1, }}, {
                new: true,
            })
        }

        if(req.body.type === "Investor"){
            await Metric.findByIdAndUpdate(m._id, {$set: {
                "stakeholders.Total": m.stakeholders.Total + 1,
                "stakeholders.Investor": m.stakeholders.Investor + 1, }}, {
                new: true,
            })
        }

        res.status(200).json(stakeholder)
    }    
})

// desc:    Delete a stakeholder of a project
// route:   DELETE /api/stakeholders
// access:  Private
// dev:     Aliyu A.  
const removeStakeholder = asyncHandler(async (req, res) => {
    if(!req.body.type){
        res.status(400)
        throw new Error('Please provide the stakeholder type')
    }

    // check that user exists
    if(!req.body.user){
        res.status(401)
        throw new Error('User does not exist in request')
    }

    // check that project exists
    if(!req.body.project){
        res.status(401)
        throw new Error('Project does not exist in request')
    }

    const user = await User.findById(req.user.id)
    const project = await Project.findById(req.body.project)

    // check that user exists
    if(!user){
        res.status(401)
        throw new Error('User does not exist')
    }

    // check that project exists
    if(!project){
        res.status(401)
        throw new Error('Project does not exist')
    }

    // only the initiator of the project (passed as parameter) can add stakeholders (
    // supervisors, Developers, Collaborators and researchers) to the project
    // Any user can follow or invest in public projects without the authorization of the initiator
    // the stakeholder can also delete themselves
    if((req.body.type === "Supervisor" && req.user.id !== req.body.user) || 
        (req.body.type === "Researcher" && req.user.id !== req.body.user) || 
        (req.body.type === "Developer" && req.user.id !== req.body.user) || 
        (req.body.type === "Collaborator" && req.user.id !== req.body.user)) {
        // Check that the logged in user is the same as the project user
        if(project.user.toString() !== user.id){
            res.status(401)
            throw new Error('User not authorized')
        }
    }

    const stake = await Stakeholder.findOne({ user: req.body.user, project: req.body.project })
    
    if (stake && stake.type.includes(req.body.type) && stake.type.length !== 0){
        // if the stake exists and the type to be removed is in it, then remove the item from the array of stake types for the user&project
        const stakeholder = await Stakeholder.findByIdAndUpdate(stake._id, {$pull: {type: req.body.type}}, {
            new: true,
        })

        // update metrics
        const m = await Metric.findOne()

        if(req.body.type === "Collaborator"){
            await Metric.findByIdAndUpdate(m._id, {$set: {
                "stakeholders.Total": m.stakeholders.Total - 1,
                "stakeholders.Collaborator": m.stakeholders.Collaborator - 1, }}, {
                new: true,
            })
        }

        if(req.body.type === "Supervisor"){
            await Metric.findByIdAndUpdate(m._id, {$set: {
                "stakeholders.Total": m.stakeholders.Total - 1,
                "stakeholders.Supervisor": m.stakeholders.Supervisor - 1, }}, {
                new: true,
            })
        }
    
        if(req.body.type === "Researcher"){
            await Metric.findByIdAndUpdate(m._id, {$set: {
                "stakeholders.Total": m.stakeholders.Total - 1,
                "stakeholders.Researcher": m.stakeholders.Researcher - 1, }}, {
                new: true,
            })
        }
    
        if(req.body.type === "Developer"){
            await Metric.findByIdAndUpdate(m._id, {$set: {
                "stakeholders.Total": m.stakeholders.Total - 1,
                "stakeholders.Developer": m.stakeholders.Developer - 1, }}, {
                new: true,
            })
        }

        if(req.body.type === "Initiator"){
            await Metric.findByIdAndUpdate(m._id, {$set: {
                "stakeholders.Total": m.stakeholders.Total - 1,
                "stakeholders.Initiator": m.stakeholders.Initiator - 1, }}, {
                new: true,
            })
        }
    
        if(req.body.type === "Follower"){
            await Metric.findByIdAndUpdate(m._id, {$set: {
                "stakeholders.Total": m.stakeholders.Total - 1,
                "stakeholders.Follower": m.stakeholders.Follower - 1, }}, {
                new: true,
            })
        }

        if(req.body.type === "Investor"){
            await Metric.findByIdAndUpdate(m._id, {$set: {
                "stakeholders.Total": m.stakeholders.Total - 1,
                "stakeholders.Investor": m.stakeholders.Investor - 1, }}, {
                new: true,
            })
        }

        // remove data entirely if there is no stakeholder status left for user&project
        if (stakeholder.type.length === 0){
            //const a = await stakeholder.remove()
            await stakeholder.remove()

            res.status(200).json({id: stakeholder._id})
        }
        else{
            res.status(200).json(stakeholder)
       }
    }
    else
    {
        res.status(400)
        throw new Error('Stakehold on Project or category does not exist')
    }
})

module.exports = {
    addStakeholder,
    removeStakeholder,
    getStakeholders,
    getStake
}