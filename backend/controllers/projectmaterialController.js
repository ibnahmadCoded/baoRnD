const asyncHandler = require('express-async-handler')

const Projectmaterial = require('../models/projectmaterialModel')
const Project = require('../models/projectModel')

// desc:    Get all materials for a project.  
// route:   GET /api/projectmaterials/:project
// access:  Private 
// dev:     Aliyu A.   
const getProjectmaterials = asyncHandler(async (req, res) => {
    if(!req.params.project){
        res.status(400)
        throw new Error('Please provide the project')
    }
    
    const projectmaterials = await Projectmaterial.find({ item: req.params.project })

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

    if(!req.body.visibility){
        res.status(400)
        throw new Error('Please set the project material`s visibility')
    }

    if(!req.body.type){
        res.status(400)
        throw new Error('Please set the project material`s type')
    }

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

    const projectmaterial = await Projectmaterial.create({
        project: req.body.project,
        material: req.body.material,
        visibility: req.body.visibility,
        type: req.body.type
    })

    res.status(200).json(projectmaterial)
    
})

// desc:    Remove material for a project.  
// route:   DELETE /api/projectmaterials
// access:  Private 
// dev:     Aliyu A.   
const removeProjectmaterial = asyncHandler(async (req, res) => {
    if(!req.params.id){
        res.status(400)
        throw new Error('Please provide the material')
    }

    const projectmaterial = await Projectmaterial.findById(req.params.id)

    if(!projectmaterial){
        res.status(400)
        throw new Error('Material does not exist')
    }
    
    const project = await Project.findById(projectmaterial.project)

    if(!project){
        res.status(400)
        throw new Error('Project does not exist')
    }

    // Only the initiator of the project can remove materials from it
    if(project.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await projectmaterial.remove()

    res.status(200).json({ id: req.params.id })
    
})

module.exports = {
    addProjectmaterial,
    removeProjectmaterial,
    getProjectmaterials,
}