const asyncHandler = require('express-async-handler')

const Deliverable = require('../models/projectdeliverableModel')
const Project = require('../models/projectModel')

// desc:    Get all deliverables for a project.  
// route:   GET /api/projectdeliverables
// access:  Private 
// dev:     Aliyu A.   
const getDeliverables = asyncHandler(async (req, res) => {
    if(!req.body.project){
        res.status(400)
        throw new Error('Please provide the project')
    }
    
    const deliverables = await Deliverable.find({ project: req.body.project })

    res.status(200).json(deliverables)
    
})

// desc:    Add deliverable to a project.  
// route:   POST /api/projectdeliverables
// access:  Private 
// dev:     Aliyu A.   
const addDeliverable = asyncHandler(async (req, res) => {
    if(!req.body.project){
        res.status(400)
        throw new Error('Please provide the project')
    }

    if(!req.body.deliverable){
        res.status(400)
        throw new Error('Please provide the project deliverable')
    }
    
    // get deliverable of project to check if project already exists. We dont want to duplicate projects in this collection
    const g = await Deliverable.findOne({ project: req.body.project })

    const project = await Project.findOne({ _id: req.body.project })

    if(!project){
        res.status(400)
        throw new Error('Project does not exist')
    }

    // Only the initiator of the project can add new tags to it
    if(project.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    if (g){
        // if the project already exists with its tags in the collection, just update it with the additional deliverable
        const deliverable = await Deliverable.findByIdAndUpdate(g._id, {$addToSet: {deliverables: req.body.deliverable}}, {
            new: true,
        })

        res.status(200).json(deliverable)
    }
    else
    {
        // else we create a new deliverable entry for the project, in the collection
        const deliverable = await Deliverable.create({
            project: req.body.project,
            deliverables: req.body.deliverable
        })

        res.status(200).json(deliverable)
    }
    
})

// desc:    Remove deliverable for a project.  
// route:   DELETE /api/tags
// access:  Private 
// dev:     Aliyu A.   
const removeDeliverable = asyncHandler(async (req, res) => {
    if(!req.body.project){
        res.status(400)
        throw new Error('Please provide the project')
    }

    if(!req.body.deliverable){
        res.status(400)
        throw new Error('Please provide the project deliverable')
    }
    
    // get tags of project to check if project already exists. We dont want to duplicate projects in this collection
    const g = await Deliverable.findOne({ project: req.body.project })

    const project = await Project.findOne({ _id: req.body.project })

    if(!project){
        res.status(400)
        throw new Error('Project does not exist')
    }

    // Only the initiator of the project can remove tags from it
    if(project.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    if (g && g.deliverables.includes(req.body.deliverable)){
        // if the project already exists with to be removed is in it, then remove the item from the array of tags for the project
        const deliverable = await Deliverable.findByIdAndUpdate(g._id, {$pull: {deliverables: req.body.deliverable}}, {
            new: true,
        })

        // remove data entirely if there is no deliverable left for user&project
        if (deliverable.deliverables.length === 0){
            await deliverable.remove()

            res.status(200).json("All tags removed from project")
        }
        else{
            res.status(200).json(`The ${req.body.deliverable} status removed from project. Current tags: ${deliverable.deliverables}`)
        }
    }
    else
    {
        res.status(400)
        throw new Error('Project or deliverable does not exist')
    }
    
})

module.exports = {
    addDeliverable,
    removeDeliverable,
    getDeliverables,
}