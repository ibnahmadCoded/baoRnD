const asyncHandler = require('express-async-handler')

// desc:    Get all public projects, including private projects of current user if user is logged in. 
// route:   GET /api/projects
// access:  Private + Public
// dev:     Aliyu A.   
const getProjects = asyncHandler(async (req, res) => {
    res.status(200).send({ message: 'Get all projects' })
})

// desc:    Get all user's projects, including projects in which they have full view. Should give filter func later. 
//          fillter func should give opp. to show either user's projects only or other users' projects which they have full view 
// route:   GET /api/projects/myprojects
// access:  Private
// dev:     Aliyu A.   
const getMyProjects = asyncHandler(async (req, res) => {
    res.status(200).send({ message: 'Get my projects' })
})

// desc:    Get all projects the user is following.
// route:   GET /api/projects/projectsifollow
// access:  Private
// dev:     Aliyu A.   
const getProjectsIFollow = asyncHandler(async (req, res) => {
    res.status(200).send({ message: 'Get all projects I am following' })
})

// desc:    Get a project 
// route:   GET /api/projects/:id
// access:  Private. if not logged in, cant view individual project details, even for public projects!
// dev:     Aliyu A.   
const getAProject = asyncHandler(async (req, res) => {
    res.status(200).send({ message: `Get a project ${req.params.id}` })
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

    res.status(200).send({ message: 'Create project' })
})

// desc:    Update project 
// route:   PUT /api/projects/:id
// access:  Private
// dev:     Aliyu A.   
const updateProject = asyncHandler(async (req, res) => {
    res.status(200).send({ message: `Update project ${req.params.id}` })
})

// desc:    Delete project 
// route:   DELETE /api/projects/:id
// access:  Private
// dev:     Aliyu A.   
const deleteProject = asyncHandler(async (req, res) => {
    res.status(200).send({ message: `Delete project ${req.params.id}`  })
})

module.exports = {
    getProjects,
    getMyProjects,
    getProjectsIFollow,
    getAProject,
    createProject,
    updateProject,
    deleteProject,
}