const asyncHandler = require('express-async-handler')

const Projectmaterial = require('../models/projectmaterialModel')
const Project = require('../models/projectModel')

// desc:    Get all materials for a project.  
// route:   GET /api/projectmaterials
// access:  Private 
// dev:     Aliyu A.   
const getProjectmaterials = asyncHandler(async (req, res) => {
    if(!req.body.project){
        res.status(400)
        throw new Error('Please provide the project')
    }
    
    const projectmaterials = await Projectmaterial.find({ item: req.body.project })

    res.status(200).json(projectmaterials)
    
})

// desc:    Add material to a project.  
// route:   POST /api/projectmaterials
// access:  Private 
// dev:     Aliyu A.   
const addProjectmaterial = asyncHandler(async (req, res) => {
    if(!req.body.project){
        res.status(400)
        throw new Error('Please provide the project')
    }

    if(!req.body.material){
        res.status(400)
        throw new Error('Please provide the project material')
    }
    
    // get material of project to check if project already exists. We dont want to duplicate projects in this collection
    const pm = await Projectmaterial.findOne({ project: req.body.project })

    const project = await Project.findOne({ _id: req.body.project })

    if(!project){
        res.status(400)
        throw new Error('Project does not exist')
    }

    // Only the initiator of the project can add new materials to it
    if(project.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    if (pm){
        // if the project already exists with its materials in the collection, just update it with the additional material
        const projectmaterial = await Projectmaterial.findByIdAndUpdate(pm._id, {$addToSet: {materials: req.body.material}}, {
            new: true,
        })

        res.status(200).json(projectmaterial)
    }
    else
    {
        // else we create a new material entry for the project, in the collection
        const projectmaterial = await Projectmaterial.create({
            project: req.body.project,
            materials: req.body.material
        })

        res.status(200).json(projectmaterial)
    }
    
})

// desc:    Remove material for a project.  
// route:   DELETE /api/projectmaterials
// access:  Private 
// dev:     Aliyu A.   
const removeProjectmaterial = asyncHandler(async (req, res) => {
    if(!req.body.project){
        res.status(400)
        throw new Error('Please provide the project')
    }

    if(!req.body.material){
        res.status(400)
        throw new Error('Please provide the project material')
    }
    
    // get materials of project to check if project already exists. We dont want to duplicate projects in this collection
    const pm = await Projectmaterial.findOne({ project: req.body.project })

    const project = await Project.findOne({ _id: req.body.project })

    if(!project){
        res.status(400)
        throw new Error('Project does not exist')
    }

    // Only the initiator of the project can remove materials from it
    if(project.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    if (pm && pm.materials.includes(req.body.material)){
        // if the project already exists with the material to be removed in it, remove the item from the array of materials for the project
        const projectmaterial = await Projectmaterial.findByIdAndUpdate(pm._id, {$pull: {materials: req.body.material}}, {
            new: true,
        })

        // remove data entirely if there is material left for user&project
        if (projectmaterial.materials.length === 0){
            await projectmaterial.remove()

            res.status(200).json("All materials removed from project")
        }
        else{
            res.status(200).json(`The ${req.body.material} material removed from project. Current materials: ${projectmaterial.materials}`)
        }
    }
    else
    {
        res.status(400)
        throw new Error('Project or material does not exist')
    }
    
})

module.exports = {
    addProjectmaterial,
    removeProjectmaterial,
    getProjectmaterials,
}