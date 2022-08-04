const asyncHandler = require('express-async-handler')

const Update = require('../models/projectupdateModel')
const Stake = require('../models/stakeholderModel')
const Project = require('../models/projectModel')

// desc:    Get all updates made by a user.  Can filter for the particular project if we want to show updates of user in a particular project
// route:   GET /api/projectupdates
// access:  Private 
// dev:     Aliyu A.   
const getMyUpdates = asyncHandler(async (req, res) => {
    const updates = await Update.find({ user: req.user.id })

    res.status(200).json(updates)
    
})

// desc:    Get an update
// route:   GET /api/projectupdates/:id
// access:  Private 
// dev:     Aliyu A.   
const getAnUpdate = asyncHandler(async (req, res) => {
    const update = await Update.findById(req.params.id)

    res.status(200).json(update)
    
})

// desc:    Get all updates on a project. Only a researcher, developer, initiator or supervisor can push an update to a project
// route:   GET /api/projectupdates/getprojectupdates
// access:  Private 
// dev:     Aliyu A.   
// note: 
        // the type of the update can be either userNote (always hidden, only the updater can see it), 
        // Hidden (only people with viewership can see) or Normal (default value, visible to ppl wiht viewership on project). 
        // future imporvement is to be able to hide specific parts of an update (e.g. hide a calculaiton or image, etc)
const getProjectUpdates = asyncHandler(async (req, res) => {
    if(!req.body.project){
        res.status(400)
        throw new Error('Please provide project')
    }

    updates =[]

    // get hidden updates on the project
    const hiddenupdates = await Update.find({ project: req.body.project, type: "Hidden" })

    // Hidden (only people with viewership can see). 
    // we need to ensure the current user can view the hidden updates they have access to view.
    for (var i = 0; i < hiddenupdates.length; i++) {
        obj = await Stake.findOne({
           project: hiddenupdates[i].project,
           user: req.user.id,
           viewership: true
        })
        
        if (obj) {
            updates.push(hiddenupdates[i])
        }
        else{
            // we want to show that a hidden update was made
            updates.push({
                _id: hiddenupdates[i]._id,
                user: hiddenupdates[i].user,
                project: hiddenupdates[i].project,
                type: hiddenupdates[i].type,
                content: "Not available"
                        })
        }
    }

    // get Note updates on the project
    const notes = await Update.find({ project: req.body.project, type: "Note" })

    // Note (always hidden, only the updater can see it)
    for (var i = 0; i < notes.length; i++) {
        // if the current user is the same as the note user
        if (notes[i].user.toString() === req.user.id) {
            updates.push(notes[i])
        }
        else{
            // we want to show that a hidden note update was made
            updates.push({
                _id: notes[i]._id,
                user: notes[i].user,
                project: notes[i].project,
                type: notes[i].type,
                content: "Not available"
                        })
        }
    }

    // get normal updates on the project
    const normalupdates = await Update.find({ project: req.body.project, type: "Normal" })

    res.status(200).json(updates.concat(normalupdates))
    
})

// desc:    Add an update for project.
// route:   POST /api/projectupdates
// access:  Private 
// dev:     Aliyu A.   
const addUpdate = asyncHandler(async (req, res) => {
    if(!req.body.project){
        res.status(400)
        throw new Error('Please provide project')
    }

    if(!req.body.type){
        res.status(400)
        throw new Error('Please provide update type')
    }

    if(!req.body.content){
        res.status(400)
        throw new Error('Please provide update content')
    }

    // you cannot update on an inexistent project
    const project = await Project.findOne({ _id: req.body.project })
    if(!project){
        res.status(400)
        throw new Error('Project not found')
    }

    // Only a researcher, developer, initiator, collaborator or supervisor can push an update to a project
    // get user + project + update status = true from the stakeholders collection
    const stake = await Stake.findOne({ user: req.user.id, project: req.body.project, update: true })

    if(!stake){
        res.status(400)
        throw new Error('User not authorized')
    }

    // we create the update
    const update = await Update.create({
        user: req.user.id,
        project: req.body.project,
        type: req.body.type,
        content: req.body.content
    })

    // notify the user who owns (initiated) the project about the application
    
    // TODO: notify all stakeholders of new update on the project (future addition)

    res.status(200).json(update)  
})

// desc:    Edit an updat of user for project.
// route:   PUT /api/projectupdates/:id
// access:  Private 
// dev:     Aliyu A.   
const editUpdate = asyncHandler(async (req, res) => {
    const update = await Update.findById(req.params.id)

    if(!update){
        res.status(400)
        throw new Error('Update does not exist')
    }

    // Only the updater can edit the update
    if(update.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const editedUpdate = await Update.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(editedUpdate) 
})

// desc:    Delete an update of a user to a project. Only the user who pushed the update can delete
// route:   DELETE /api/projectupdates/:id
// access:  Private
// dev:     Aliyu A.   
const deleteUpdate = asyncHandler(async (req, res) => {
    const update = await Update.findById(req.params.id)

    if(!update){
        res.status(400)
        throw new Error('Update does not exist')
    }

    // Only the user who made the update can delete
    if(req.user.id !== update.user.toString()){
        res.status(400)
        throw new Error('User not Authorized')
    }

    await update.remove()

    res.status(200).json({ id: req.params.id })
})


module.exports = {
    addUpdate,
    getProjectUpdates,
    getMyUpdates, 
    deleteUpdate,
    getAnUpdate,
    editUpdate
}