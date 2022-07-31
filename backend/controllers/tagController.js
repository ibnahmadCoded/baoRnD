const asyncHandler = require('express-async-handler')

const Tag = require('../models/tagModel')
const Project = require('../models/projectModel')

// desc:    Get all tags for a project.  
// route:   GET /api/tags
// access:  Private 
// dev:     Aliyu A.   
const getTags = asyncHandler(async (req, res) => {
    if(!req.body.project){
        res.status(400)
        throw new Error('Please provide the project')
    }
    
    const tags = await Tag.find({ item: req.body.project })

    res.status(200).json(tags)
    
})

// desc:    Add tag to a project.  
// route:   POST /api/tags
// access:  Private 
// dev:     Aliyu A.   
const addTag = asyncHandler(async (req, res) => {
    if(!req.body.project){
        res.status(400)
        throw new Error('Please provide the project')
    }

    if(!req.body.tag){
        res.status(400)
        throw new Error('Please provide the project tag')
    }
    
    // get tag of project to check if project already exists. We dont want to duplicate projects in this collection
    const t = await Tag.findOne({ project: req.body.project })

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

    if (t){
        // if the project already exists with its tags in the collection, just update it with the additional tag
        const tag = await Tag.findByIdAndUpdate(t._id, {$addToSet: {tags: req.body.tag}}, {
            new: true,
        })

        res.status(200).json(tag)
    }
    else
    {
        // else we create a new tag entry for the project, in the collection
        const tag = await Tag.create({
            project: req.body.project,
            tags: req.body.tag
        })

        res.status(200).json(tag)
    }
    
})

// desc:    Remove tag for a project.  
// route:   DELETE /api/tags
// access:  Private 
// dev:     Aliyu A.   
const removeTag = asyncHandler(async (req, res) => {
    if(!req.body.project){
        res.status(400)
        throw new Error('Please provide the project')
    }

    if(!req.body.tag){
        res.status(400)
        throw new Error('Please provide the project tag')
    }
    
    // get tags of project to check if project already exists. We dont want to duplicate projects in this collection
    const t = await Tag.findOne({ project: req.body.project })

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

    if (t && t.tags.includes(req.body.tag)){
        // if the project already exists with to be removed is in it, then remove the item from the array of tags for the project
        const tag = await Tag.findByIdAndUpdate(t._id, {$pull: {tags: req.body.tag}}, {
            new: true,
        })

        // remove data entirely if there is no stakeholder status left for user&project
        if (tag.tags.length === 0){
            await tag.remove()

            res.status(200).json("All tags removed from project")
        }
        else{
            res.status(200).json(`The ${req.body.tag} status removed from project. Current tags: ${tag.tags}`)
        }
    }
    else
    {
        res.status(400)
        throw new Error('Project or tag does not exist')
    }
    
})

module.exports = {
    getTags,
    addTag,
    removeTag,
}