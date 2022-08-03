const asyncHandler = require('express-async-handler')

const Projectmilestone = require('../models/projectmilestoneModel')
const Project = require('../models/projectModel')

// desc:    Get all milestones for a project.  
// route:   GET /api/projectmilestones
// access:  Private 
// dev:     Aliyu A.   
const getProjectmilestones = asyncHandler(async (req, res) => {
    if(!req.body.project){
        res.status(400)
        throw new Error('Please provide the project')
    }
    
    const projectmilestones = await Projectmilestone.find({ item: req.body.project })

    res.status(200).json(projectmilestones)
    
})

// desc:    Add milestone to a project.  
// route:   POST /api/projectmilestones
// access:  Private 
// dev:     Aliyu A.   
const addProjectmilestone = asyncHandler(async (req, res) => {
    if(!req.body.project){
        res.status(400)
        throw new Error('Please provide the project')
    }

    if(!req.body.milestone){
        res.status(400)
        throw new Error('Please provide the project milestone')
    }
    
    // get milestone of project to check if project already exists. We dont want to duplicate projects in this collection
    const pm = await Projectmilestone.findOne({ project: req.body.project })

    const project = await Project.findOne({ _id: req.body.project })

    if(!project){
        res.status(400)
        throw new Error('Project does not exist')
    }

    // Only the initiator of the project can add new milestones to it
    if(project.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    if (pm){
        // if the project already exists with its milestones in the collection, just update it with the additional milestones
        const projectmilestone = await Projectmilestone.findByIdAndUpdate(pm._id, {$addToSet: {milestones: req.body.milestone}}, {
            new: true,
        })

        res.status(200).json(projectmilestone)
    }
    else
    {
        // else we create a new tag entry for the project, in the collection
        const projectmilestone = await Projectmilestone.create({
            project: req.body.project,
            milestones: req.body.milestone
        })

        res.status(200).json(projectmilestone)
    }
    
})

// desc:    Remove milestone for a project.  
// route:   DELETE /api/projectmilestones
// access:  Private 
// dev:     Aliyu A.   
const removeProjectmilestone = asyncHandler(async (req, res) => {
    if(!req.body.project){
        res.status(400)
        throw new Error('Please provide the project')
    }

    if(!req.body.milestone){
        res.status(400)
        throw new Error('Please provide the project milestone')
    }
    
    // get milestones of project to check if project already exists. We dont want to duplicate projects in this collection
    const pm = await Projectmilestone.findOne({ project: req.body.project })

    const project = await Project.findOne({ _id: req.body.project })

    if(!project){
        res.status(400)
        throw new Error('Project does not exist')
    }

    // Only the initiator of the project can remove milestones from it
    if(project.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    if (pm && pm.milestones.includes(req.body.milestone)){
        // if the project already exists with the milestone to be removed in it, remove the item from the array of milestones for the project
        const projectmilestone = await Projectmilestone.findByIdAndUpdate(pm._id, {$pull: {milestones: req.body.milestone}}, {
            new: true,
        })

        // remove data entirely if there is no milestones left for user&project
        if (projectmilestone.milestones.length === 0){
            await projectmilestone.remove()

            res.status(200).json("All milestones removed from project")
        }
        else{
            res.status(200).json(`The ${req.body.milestone} milestone removed from project. Current milestones: ${projectmilestone.milestones}`)
        }
    }
    else
    {
        res.status(400)
        throw new Error('Project or milestone does not exist')
    }
    
})

module.exports = {
    addProjectmilestone,
    removeProjectmilestone,
    getProjectmilestones,
}