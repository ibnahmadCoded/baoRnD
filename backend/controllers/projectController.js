const asyncHandler = require('express-async-handler')

const Project = require('../models/projectModel')

// desc:    Get all public projects, including private projects of current user if user is logged in. 
// route:   GET /api/projects
// access:  Private + Public (Public shows only public projects)
// dev:     Aliyu A.   
const getProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find()

    res.status(200).json(projects)
})

// desc:    Get all projects (all public projects, including private projects of current user if user is logged in) in a category/field/tags(later) 
// route:   GET /api/projects/filter/:key
// access:  Private. This get filter function only works when user is logged in
// dev:     Aliyu A.   
const getProjectsByFilterKey = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Get all projects that match a filter key: ${req.params.key}` })
})

// desc:    Get all user's projects, including projects in which they have full view. Should give filter func later. 
//          fillter func should give opp. to show either user's projects only or other users' projects which they have full view 
// route:   GET /api/projects/myprojects
// access:  Private
// dev:     Aliyu A.   
const getMyProjects = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get my projects' })
})

// desc:    Get all projects the user is following.
// route:   GET /api/projects/projectsifollow
// access:  Private
// dev:     Aliyu A.   
const getProjectsIFollow = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get all projects I am following' })
})

// desc:    Get a project 
// route:   GET /api/projects/:id
// access:  Private. if not logged in, cant view individual project details, even for public projects!
// dev:     Aliyu A.   
const getAProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id)

    if(!project){
        res.status(400)
        throw new Error('Project does not exist')
    }

    res.status(200).json(project)
})

// desc:    Create a project 
// route:   POST /api/projects/:id
// access:  Private
// dev:     Aliyu A.   
const createProject = asyncHandler(async (req, res) => {
    if(!req.body.visibility){
        res.status(400)
        throw new Error('Please set project visibility')
    }

    if(!req.body.detail){
        res.status(400)
        throw new Error('There is no project detail')
    }

    const project = await Project.create({
        visibility: req.body.visibility,
        detail: req.body.detail
    })

    res.status(200).json(project)
})

// desc:    Update project 
// route:   PUT /api/projects/:id
// access:  Private
// dev:     Aliyu A.   
const updateProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id)

    if(!project){
        res.status(400)
        throw new Error('Project does not exist')
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedProject)
})

// desc:    Delete project 
// route:   DELETE /api/projects/:id
// access:  Private
// dev:     Aliyu A.   
const deleteProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id)

    if(!project){
        res.status(400)
        throw new Error('Project does not exist')
    }

    await project.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getProjects,
    getMyProjects,
    getProjectsIFollow,
    getAProject,
    createProject,
    updateProject,
    deleteProject,
    getProjectsByFilterKey,
}