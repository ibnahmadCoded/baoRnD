const asyncHandler = require('express-async-handler')

const Goal = require('../models/projectgoalModel')
const Project = require('../models/projectModel')

// desc:    Get all goals for a project.  
// route:   GET /api/projectgoals/:project
// access:  Private 
// dev:     Aliyu A.   
const getGoals = asyncHandler(async (req, res) => {
    if(!req.params.project){
        res.status(400)
        throw new Error('Please provide the project')
    }
    
    const goals = await Goal.find({ project: req.params.project })

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
    // const g = await Goal.findOne({ project: req.body.project })

    const project = await Project.findOne({ _id: req.body.project })

    if(!project){
        res.status(400)
        throw new Error('Project does not exist')
    }

    // Only the initiator of the project can add new goals to it
    if(project.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    // We create a new goal entry for the project, in the collection
    const goal = await Goal.create({
        project: req.body.project,
        goal: req.body.goal,
        completed: false
    })

    res.status(200).json(goal)

        /*
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
    */
    
})

// desc:    Remove goal for a project.  
// route:   DELETE /api/tags
// access:  Private 
// dev:     Aliyu A.   
const removeGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal does not exist')
    }

    const project = await Project.findOne({ _id: goal.project })

    if(!project){
        res.status(400)
        throw new Error('Project does not exist')
    }

    // Only the initiator of the project can remove tags from it
    if(project.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await goal.remove()

    res.status(200).json({ id: req.params.id })

    /*
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

    */
    
})

// desc:    Update a goal completed or uncompleted.  
// route:   PUT /api/projectgoals/:id
// access:  Private 
// dev:     Aliyu A.   
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    
    const project = await Project.findOne({ _id: goal.project })

    if(!project){
        res.status(400)
        throw new Error('Project does not exist')
    }

    // Only the initiator of the project can remove tags from it
    if(project.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    if(!goal){
        res.status(400)
        throw new Error('Goal does not exist')
    }

    const g = await Goal.findByIdAndUpdate(req.params.id, {completed: !goal.completed}, {
        new: true,
    })

    res.status(200).json(g)
    
})

module.exports = {
    addGoal,
    removeGoal,
    getGoals,
    updateGoal,
}