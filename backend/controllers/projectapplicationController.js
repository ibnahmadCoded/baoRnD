const asyncHandler = require('express-async-handler')

const Application = require('../models/projectapplicationModel')
const Project = require('../models/projectModel')
const Stake = require('../models/stakeholderModel')
const Notification = require('../models/notificationModel')
const User = require('../models/userModel')

// desc:    Get all applications of a user.  Can filter for the particular project if we want to show applications of user in a particular project
// route:   GET /api/projectapplications
// access:  Private 
// dev:     Aliyu A.   
const getMyApplications = asyncHandler(async (req, res) => {
    const applications = await Application.find({ user: req.user.id })

    res.status(200).json(applications)
    
})

// desc:    Get an application
// route:   GET /api/projectapplications/:id
// access:  Private 
// dev:     Aliyu A.   
const getApplication = asyncHandler(async (req, res) => {
    const application = await Application.findById(req.params.id)

    res.status(200).json(application)
    
})

// desc:    Get all applications to a project. Only the initiator of a project can use this route to see all applications to join a project.
// route:   GET /api/projectapplications/apps/:project
// access:  Private 
// dev:     Aliyu A.   
const getProjectapplications = asyncHandler(async (req, res) => {
    if(!req.params.project){
        res.status(400)
        throw new Error('Please provide project')
    }

    // get the project
    const project = await Project.findOne({ _id: req.params.project })

    if(!project){
        res.status(400)
        throw new Error('Project does not exist')
    }
    
    // only the initiator of a project can view all applications made to join it
    // get stakeholder of the project, where user matches project
    //const stake = await Stake.findOne({ user: req.user.id, project: req.params.project, type: { "$in" : ["Initiator"]} })
    
    //if(!stake){
    //    res.status(400)
    //    throw new Error('User not authorized')
    //}

    const applications = await Application.find({ project: req.params.project })

    res.status(200).json(applications)
    
})

// desc:    Add an application of user for project.
// route:   POST /api/projectapplications
// access:  Private 
// dev:     Aliyu A.   
const addApplication = asyncHandler(async (req, res) => {
    if(!req.body.project){
        res.status(400)
        throw new Error('Please provide project')
    }

    if(!req.body.type){
        res.status(400)
        throw new Error('Please provide application type')
    }

    // check if the user has applied to project as type before but the reply is still pending. 
    // In this case we reject the new application until there is a reply to the old application.
    // fetch the application!
    const a = await Application.findOne({ user: req.user.id, project: req.body.project, type: req.body.type, reply: "Pending" })
    if(a){
        res.status(400)
        throw new Error('There is a pending application from the user for the same role on the same project')
    }

    const user = await User.findById(req.user.id)

    const project = await Project.findById(req.body.project)

    // we create the application
    const application = await Application.create({
        user: req.user.id,
        project: req.body.project,
        type: req.body.type,
        username: user.name,
        projectname: project.title,
        message: req.body.message,
        reply: "Pending"
    })

    // notify the user who owns (initiated) the project about the application
    // get the project
    await Notification.create({
        user: project.user,
        item: project._id,
        type: "ProjectApplication",
        seen: false,
    })

    res.status(200).json(application)  
})

// desc:    Add an application of user for project.
// route:   PUT /api/projectapplications/:id
// access:  Private 
// dev:     Aliyu A.   
const updateApplication = asyncHandler(async (req, res) => {
    const application = await Application.findById(req.params.id)

    if(!req.body.reply){
        res.status(400)
        throw new Error('Application reply is absent')
    }

    if(!application){
        res.status(400)
        throw new Error('Application does not exist')
    }

    // Only the initiator can update a project application (reply to it)
    const stake = await Stake.findOne({ user: req.user.id, project: application.project.toString(), type: { "$in" : ["Initiator"]} })

    // Check that the logged in user is the same as the project user (only the project creator can edit its details)
    if(!stake){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedApplication = await Application.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    // add stakeholder to project 
    const project = await Project.findById(updatedApplication.project)

    var cat

    if(project.category === "Res"){
        cat = "Researcher"
    }

    if(project.category === "Sup"){
        cat = "Supervisor"
    }

    if(project.category === "Dev"){
        cat = "Developer"
    }

    if(project.category === "Collab"){
        cat = "Collaborator"
    }

    // notify the user
    if(req.body.reply === "Accepted"){
        
        // add stakeholder
        const stake = await Stake.findOne({ user: updatedApplication.user, project: updatedApplication.project })
    
        if(stake){
            // if the user item already exists with its stakes on the project in the collection, just update it with the additional stake
            await Stake.findByIdAndUpdate(stake._id, {
                viewership: true, 
                update: true,
                $addToSet: {type: cat}}, {
                new: true,
            })
        }
        else
        {
            await Stake.create({
                user: updatedApplication.user,
                username: updatedApplication.username,
                project: updatedApplication.project,
                type: cat,
                viewership: true,
                update: true,
            })

        }    

        await Notification.create({
            user: project.user,
            item: project._id,
            type: "ProjectApplicationAccepted",
            seen: false,
        })
    }

    if(req.body.reply === "Rejected"){

        await Notification.create({
            user: project.user,
            item: project._id,
            type: "ProjectApplicationRejected",
            seen: false,
        })
    }

    res.status(200).json(updatedApplication) 
})

// desc:    Delete an application of a user to a project. Only the user who applied can delete
// route:   DELETE /api/projectapplications/:id
// access:  Private
// dev:     Aliyu A.   
const deleteApplication = asyncHandler(async (req, res) => {
    const application = await Application.findById(req.params.id)

    if(!application){
        res.status(400)
        throw new Error('Application does not exist')
    }

    // Only the user who applied can delete
    if(req.user.id !== application.user.toString()){
        res.status(400)
        throw new Error('User not Authorized')
    }

    await application.remove()

    res.status(200).json({ id: req.params.id })
})


module.exports = {
    addApplication,
    getMyApplications,
    getProjectapplications, 
    deleteApplication,
    getApplication,
    updateApplication
}