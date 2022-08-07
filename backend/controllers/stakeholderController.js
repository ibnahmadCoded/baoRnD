const asyncHandler = require('express-async-handler')

const Stakeholder = require('../models/stakeholderModel')
const User = require('../models/userModel')
const Project = require('../models/projectModel')

// desc:    Get all Stakeholders for a project. 
// route:   GET /api/stakeholders
// access:  Private 
// dev:     Aliyu A.   
const getStakeholders = asyncHandler(async (req, res) => {
    const stakeholders = await Stakeholder.find({ project: req.body.project })

    res.status(200).json(stakeholders)
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
    
    if(stake){
        // if the user item already exists with its stakes on the project in the collection, just update it with the additional stake
        const stakeholder = await Stakeholder.findByIdAndUpdate(stake._id, {
            viewership: req.body.viewership, 
            update: req.body.update,
            $addToSet: {type: req.body.type}}, {
            new: true,
        })

        res.status(200).json(stakeholder)
    }
    else
    {
        const stakeholder = await Stakeholder.create({
            user: req.body.user,
            project: req.body.project,
            type: req.body.type,
            viewership: req.body.viewership,
            update: req.body.update
        })

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
    // A user can follow or invest in public projects without the authorization of the initiator
    if(req.body.type === "Supervisor" || req.body.type === "Researcher" || req.body.type === "Developer" || req.body.type === "Collaborator") {
        // Check that the logged in user is the same as the project user
        if(project.user.toString() !== user.id){
            res.status(401)
            throw new Error('User not authorized')
        }
    }

    const stake = await Stakeholder.findOne({ user: req.body.user, project: req.body.project })
    
    if (stake && stake.type.includes(req.body.type)){
        // if the stake exists and the type to be removed is in it, then remove the item from the array of stake types for the user&project
        const stakeholder = await Stakeholder.findByIdAndUpdate(stake._id, {$pull: {type: req.body.type}}, {
            new: true,
        })

        // remove data entirely if there is no stakeholder status left for user&project
        if (stakeholder.type.length === 0){
            await stakeholder.remove()

            res.status(200).json(`All stakeholder statuses removed for user and project`)
        }
        else{
            res.status(200).json(`The ${req.body.type} status removed from project. Current stakes: ${stakeholder.type}`)
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
}