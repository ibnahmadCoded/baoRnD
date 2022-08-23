const asyncHandler = require('express-async-handler')

const Field = require('../models/fieldModel')
const Project = require('../models/projectModel')

// desc:    Get all fields for a project.  
// route:   GET /api/fields
// access:  Private 
// dev:     Aliyu A.   
const getFields = asyncHandler(async (req, res) => {
    if(!req.params.project){
        res.status(400)
        throw new Error('Please provide the project')
    }
    
    const fields = await Field.find({ project: req.params.project })

    res.status(200).json(fields)
    
})

// desc:    Add field to a project.  
// route:   POST /api/fields
// access:  Private 
// dev:     Aliyu A.   
const addField = asyncHandler(async (req, res) => {
    if(!req.body.project){
        res.status(400)
        throw new Error('Please provide the project')
    }

    if(!req.body.field){
        res.status(400)
        throw new Error('Please provide the project field')
    }
    
    // get fields of project to check if project already exists. We dont want to duplicate projects in this collection
    const f = await Field.findOne({ project: req.body.project })

    const project = await Project.findOne({ _id: req.body.project })

    if(!project){
        res.status(400)
        throw new Error('Project does not exist')
    }

    // Only the initiator of the project can add new fields to it
    if(project.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    if (f){
        // if the project already exists with its fields in the collection, just update it with the additional field
        const field = await Field.findByIdAndUpdate(f._id, {$addToSet: {fields: req.body.field}}, {
            new: true,
        })

        res.status(200).json(field)
    }
    else
    {
        // else we create a new field entry for the project, in the collection
        const field = await Field.create({
            project: req.body.project,
            fields: req.body.field
        })
        res.status(200).json(field)
    }
    
})

// desc:    Remove field for a project.  
// route:   DELETE /api/fields
// access:  Private 
// dev:     Aliyu A.   
const removeField = asyncHandler(async (req, res) => {
    if(!req.body.project){
        res.status(400)
        throw new Error('Please provide the project')
    }

    if(!req.body.field){
        res.status(400)
        throw new Error('Please provide the project field')
    }
    
    // get fields of project to check if project already exists. We dont want to duplicate projects in this collection
    const f = await Field.findOne({ project: req.body.project })

    const project = await Project.findOne({ _id: req.body.project })

    if(!project){
        res.status(400)
        throw new Error('Project does not exist')
    }

    // Only the initiator of the project can remove fields from it
    if(project.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    if (f && f.fields.includes(req.body.field)){
        // if the project already exists with to be removed is in it, then remove the item from the array of fields for the project
        const field = await Field.findByIdAndUpdate(f._id, {$pull: {fields: req.body.field}}, {
            new: true,
        })

        // remove data entirely if there is no stakeholder status left for user&project
        if (field.fields.length === 0){
            await field.remove()

            res.status(200).json({ id: field._id })
        }
        else{
            res.status(200).json(field)
        }
    }
    else
    {
        res.status(400)
        throw new Error('Project or field does not exist')
    }
    
})

module.exports = { 
    getFields,
    addField,
    removeField,
}