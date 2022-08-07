const asyncHandler = require('express-async-handler')

const Goal = require('../models/projectgoalModel')
const Project = require('../models/projectModel')

// desc:    Get all goals for a project.  
// route:   GET /api/projectgoals
// access:  Private 
// dev:     Aliyu A.   
const getGoals = asyncHandler(async (req, res) => {
    if(!req.body.project){
        res.status(400)
        throw new Error('Please provide the project')
    }
    
    const goals = await Goal.find({ project: req.body.project })

    res.status(200).json(goals)
    
})

// desc:    Add goal to a project.  
// route:   POST /api/projectgoals
// access:  Private 
// dev:     Aliyu A.   
const addGoal = asyncHandler(async (req, res) => {
    if(!req.body.project){
        res.status(400)
        throw new Error('Please provide the project')
    }

    if(!req.body.goal){
        res.status(400)
        throw new Error('Please provide the project goal')
    }
    
    // get goal of project to check if project already exists. We dont want to duplicate projects in this collection
    const g = await Goal.findOne({ project: req.body.project })

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
        // if the project already exists with its tags in the collection, just update it with the additional goal
        const goal = await Goal.findByIdAndUpdate(g._id, {$addToSet: {goals: req.body.goal}}, {
            new: true,
        })

        res.status(200).json(goal)
    }
    else
    {
        // else we create a new goal entry for the project, in the collection
        const goal = await Goal.create({
            project: req.body.project,
            goals: req.body.goal
        })

        res.status(200).json(goal)
    }
    
})

// desc:    Remove goal for a project.  
// route:   DELETE /api/tags
// access:  Private 
// dev:     Aliyu A.   
const removeGoal = asyncHandler(async (req, res) => {
    if(!req.body.project){
        res.status(400)
        throw new Error('Please provide the project')
    }

    if(!req.body.goal){
        res.status(400)
        throw new Error('Please provide the project goal')
    }
    
    // get tags of project to check if project already exists. We dont want to duplicate projects in this collection
    const g = await Goal.findOne({ project: req.body.project })

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

    if (g && g.goals.includes(req.body.goal)){
        // if the project already exists with to be removed is in it, then remove the item from the array of tags for the project
        const goal = await Goal.findByIdAndUpdate(g._id, {$pull: {goals: req.body.goal}}, {
            new: true,
        })

        // remove data entirely if there is no goal left for user&project
        if (goal.goals.length === 0){
            await goal.remove()

            res.status(200).json("All tags removed from project")
        }
        else{
            res.status(200).json(`The ${req.body.goal} status removed from project. Current tags: ${goal.goals}`)
        }
    }
    else
    {
        res.status(400)
        throw new Error('Project or goal does not exist')
    }
    
})

module.exports = {
    addGoal,
    removeGoal,
    getGoals,
}