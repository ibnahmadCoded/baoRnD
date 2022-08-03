const asyncHandler = require('express-async-handler')

const Project = require('../models/projectModel')
const Stakeholder = require('../models/stakeholderModel')
const User = require('../models/userModel')
const Category = require('../models/categoryModel')
const Field = require('../models/fieldModel')
const Tag = require('../models/tagModel')

// desc:    Get all public projects, including private projects of current user if user is logged in. 
// route:   GET /api/projects
// access:  Private + Public (Public shows only public projects if user is not logged in)
// dev:     Aliyu A.   
const getProjects = asyncHandler(async (req, res) => {
    const publicProjects = await Project.find({ visibility: 'Public' })

    // get projects using the stakeholders result find result
    // get all private projects of the user. These include projects the user has view access on
    const privateProjects = await Project.find({ visibility: 'Private' })
    
    // we need to ensure the current user can view the private projects they have access to view
    privates =[]
    for (var i = 0; i < privateProjects.length; i++) {
        obj = await Stakeholder.findOne({
           project: privateProjects[i]._id,
           user: req.user.id,
           viewership: true
        })
        
        if (obj) {
            privates.push(privateProjects[i])
        }
    }

    res.status(200).json(publicProjects.concat(privates))
})

// desc:    Get all public projects, if user is not logged in. 
// route:   GET /api/projects/publiconly
// access:  Private + Public (Public shows only public projects if user is not logged in)
// dev:     Aliyu A.   
const getPublicProjectsOnly = asyncHandler(async (req, res) => {
    const projects = await Project.find({ visibility: 'Public' })

    res.status(200).json(projects)
})

// desc:    Get all projects (all public projects, including private projects of current user if user is logged in) in a category/field/tags(later) 
// route:   GET /api/projects/filter/:key
// access:  Private. This get filter function only works when user is logged in
// dev:     Aliyu A.   
// comment: Can include other filter types in the future
const getProjectsByFilterKey = asyncHandler(async (req, res) => {
    if (req.body.filterType === "Category"){
        const data = await Category.find({ category: { "$in" : [`${req.params.key}`]}, type: "Project" })

        // get all public projects that match the filter category
        publicProjects = [];
        for (var i = 0; i < data.length; i++) {
            obj = await Project.findOne({
                _id: data[i].item,
                visibility: "Public"
            })

            if (obj) {
                publicProjects.push(obj)
            }
        }
            
        // get all private projects that match the filter category
        privateProjects = [];
        for (var i = 0; i < data.length; i++) {
            obj = await Project.findOne({
                _id: data[i].item,
                visibility: "Private"
            })
            
            if (obj) {
                privateProjects.push(obj)
            }
        }
        
        // we need to ensure the current user can view the private projects
        for (var i = 0; i < privateProjects.length; i++) {
            obj = await Stakeholder.findOne({
            project: privateProjects[i]._id,
            user: req.user.id,
            viewership: true
            })
            if (!obj) {
                privateProjects = privateProjects.filter(data => data._id != privateProjects[i]._id);
            }
        }
        
        res.status(200).json(publicProjects.concat(privateProjects))
    }
    
    // filter by field
    if (req.body.filterType === "Field"){
        const data = await Field.find({ fields: { "$in" : [`${req.params.key}`]} })

        // get all public projects that match the filter category
        publicProjects = [];
        for (var i = 0; i < data.length; i++) {
            obj = await Project.findOne({
                _id: data[i].project,
                visibility: "Public"
            })

            if (obj) {
                publicProjects.push(obj)
            }
        }

        // get all private projects that match the filter category
        privateProjects = [];
        for (var i = 0; i < data.length; i++) {
            obj = await Project.findOne({
                _id: data[i].project,
                visibility: "Private"
            })
            
            if (obj) {
                privateProjects.push(obj)
            }
        }

        // we need to ensure the current user can view the private projects
        for (var i = 0; i < privateProjects.length; i++) {
            obj = await Stakeholder.findOne({
            project: privateProjects[i]._id,
            user: req.user.id,
            viewership: true
            })
            if (!obj) {
                privateProjects = privateProjects.filter(data => data._id != privateProjects[i]._id);
            }
        }

        res.status(200).json(publicProjects.concat(privateProjects))
    }

    // filter by tag
    if (req.body.filterType === "Tag"){
        const data = await Tag.find({ tags: { "$in" : [`${req.params.key}`]} })

        // get all public projects that match the filter category
        publicProjects = [];
        for (var i = 0; i < data.length; i++) {
            obj = await Project.findOne({
                _id: data[i].project,
                visibility: "Public"
            })

            if (obj) {
                publicProjects.push(obj)
            }
        }

        // get all private projects that match the filter category
        privateProjects = [];
        for (var i = 0; i < data.length; i++) {
            obj = await Project.findOne({
                _id: data[i].project,
                visibility: "Private"
            })
            
            if (obj) {
                privateProjects.push(obj)
            }
        }

        // we need to ensure the current user can view the private projects
        for (var i = 0; i < privateProjects.length; i++) {
            obj = await Stakeholder.findOne({
            project: privateProjects[i]._id,
            user: req.user.id,
            viewership: true
            })
            if (!obj) {
                privateProjects = privateProjects.filter(data => data._id != privateProjects[i]._id);
            }
        }
        
        res.status(200).json(publicProjects.concat(privateProjects))
    }
})

// desc:    Get all user's projects, including projects in which they have full view. Should give filter func later. 
//          fillter func should give opp. to show either user's projects only or other users' projects which they have full view 
// route:   GET /api/projects/myprojects
// access:  Private
// dev:     Aliyu A.   
const getMyProjects = asyncHandler(async (req, res) => {
    // get all public projects created by the user
    const publicProjects = await Project.find({ user:req.user.id, visibility: 'Public' })

    const privateProjects = await Project.find({ visibility: 'Private' })
    
    // we need to ensure the current user can view the private projects they have access to view
    privates =[]
    for (var i = 0; i < privateProjects.length; i++) {
        obj = await Stakeholder.findOne({
           project: privateProjects[i]._id,
           user: req.user.id,
           viewership: true
        })
        
        if (obj) {
            privates.push(privateProjects[i])
        }
    }

    res.status(200).json(publicProjects.concat(privates))
})

// desc:    Get all projects the user is following.
// route:   GET /api/projects/projectsifollow
// access:  Private
// dev:     Aliyu A.   
const getProjectsIFollow = asyncHandler(async (req, res) => {
    // get all projects
    const allProjects = await Project.find()
    
    // we need to ensure the current user can view the private projects they have access to view.
    // a user couldnt see a private project to follow it anyways
    projects =[]
    for (var i = 0; i < allProjects.length; i++) {
        obj = await Stakeholder.findOne({
           project: allProjects[i]._id,
           user: req.user.id,
           viewership: true,
           type: { "$in" : ["Follower"]}
        })
        
        if (obj) {
            projects.push(allProjects[i])
        }
    }

    res.status(200).json(projects)
})

// desc:    Get all projects on which the user is a reseracher.
// route:   GET /api/projects/projectsiresearch
// access:  Private
// dev:     Aliyu A.   
const getProjectsIResearch = asyncHandler(async (req, res) => {
    // get all projects
    const allProjects = await Project.find()
    
    // we need to ensure the current user can view the private projects they have access to view.
    // a user couldnt see a private project to follow it anyways
    projects =[]
    for (var i = 0; i < allProjects.length; i++) {
        obj = await Stakeholder.findOne({
           project: allProjects[i]._id,
           user: req.user.id,
           viewership: true,
           type: { "$in" : ["Researcher"]}
        })
        
        if (obj) {
            projects.push(allProjects[i])
        }
    }

    res.status(200).json(projects)
})

// desc:    Get all projects the logged in user initiated.
// route:   GET /api/projects/projectsiinitiated
// access:  Private
// dev:     Aliyu A.   
const getProjectsIInitiated = asyncHandler(async (req, res) => {
    // get all projects
    const allProjects = await Project.find()
    
    // we need to ensure the current user can view the private projects they have access to view.
    // a user couldnt see a private project to follow it anyways
    projects =[]
    for (var i = 0; i < allProjects.length; i++) {
        obj = await Stakeholder.findOne({
           project: allProjects[i]._id,
           user: req.user.id,
           viewership: true,
           type: { "$in" : ["Initiator"]}
        })
        
        if (obj) {
            projects.push(allProjects[i])
        }
    }

    res.status(200).json(projects)
})

// desc:    Get all projects the logged in user supervises.
// route:   GET /api/projects/projectsisupervise
// access:  Private
// dev:     Aliyu A.   
const getProjectsISupervise = asyncHandler(async (req, res) => {
    // get all projects
    const allProjects = await Project.find()
    
    // we need to ensure the current user can view the private projects they have access to view.
    // a user couldnt see a private project to follow it anyways
    projects =[]
    for (var i = 0; i < allProjects.length; i++) {
        obj = await Stakeholder.findOne({
           project: allProjects[i]._id,
           user: req.user.id,
           viewership: true,
           type: { "$in" : ["Supervisor"]}
        })
        
        if (obj) {
            projects.push(allProjects[i])
        }
    }

    res.status(200).json(projects)
})

// desc:    Get all projects the logged in user invested or invests in.
// route:   GET /api/projects/projectsiinvest
// access:  Private
// dev:     Aliyu A.   
const getProjectsIInvenst = asyncHandler(async (req, res) => {
    // get all projects
    const allProjects = await Project.find()
    
    // we need to ensure the current user can view the private projects they have access to view.
    // a user couldnt see a private project to follow it anyways
    projects =[]
    for (var i = 0; i < allProjects.length; i++) {
        obj = await Stakeholder.findOne({
           project: allProjects[i]._id,
           user: req.user.id,
           viewership: true,
           type: { "$in" : ["Investor"]}
        })
        
        if (obj) {
            projects.push(allProjects[i])
        }
    }

    res.status(200).json(projects)
})

// desc:    Get all projects the logged in user is developing, e.g. a road, a new product, etc.
// route:   GET /api/projects/projectsidevelop
// access:  Private
// dev:     Aliyu A.   
const getProjectsIDevelop = asyncHandler(async (req, res) => {
    // get all projects
    const allProjects = await Project.find()
    
    // we need to ensure the current user can view the private projects they have access to view.
    // a user couldnt see a private project to follow it anyways
    projects =[]
    for (var i = 0; i < allProjects.length; i++) {
        obj = await Stakeholder.findOne({
           project: allProjects[i]._id,
           user: req.user.id,
           viewership: true,
           type: { "$in" : ["Developer"]}
        })
        
        if (obj) {
            projects.push(allProjects[i])
        }
    }

    res.status(200).json(projects)
})

// desc:    Get all projects the logged in user is collaborating in
// route:   GET /api/projects/projectsicollaborate
// access:  Private
// dev:     Aliyu A.   
const getProjectsICollaborate = asyncHandler(async (req, res) => {
    // get all projects
    const allProjects = await Project.find()
    
    // we need to ensure the current user can view the private projects they have access to view.
    // a user couldnt see a private project to follow it anyways
    projects =[]
    for (var i = 0; i < allProjects.length; i++) {
        obj = await Stakeholder.findOne({
           project: allProjects[i]._id,
           user: req.user.id,
           viewership: true,
           type: { "$in" : ["Collaborator"]}
        })
        
        if (obj) {
            projects.push(allProjects[i])
        }
    }

    res.status(200).json(projects)
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

    const user = await User.findById(req.user.id)

    // check that user exists
    if(!user){
        res.status(401)
        throw new Error('User does not exist')
    }

    const project = await Project.create({
        user: user.id,
        visibility: req.body.visibility,
        detail: req.body.detail
    })

    // Add project and user to the stakeholders collection, with user as initiator
    const stakeholder = await Stakeholder.create({
        user: user.id,
        project: project.id,
        type: 'Initiator',
        viewership: true
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

    const user = await User.findById(req.user.id)

    // check that user exists
    if(!user){
        res.status(401)
        throw new Error('User does not exist')
    }

    // Check that the logged in user is the same as the project user (only the project creator can edit its details)
    if(project.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
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
    getAProject,
    createProject,
    updateProject,
    deleteProject,
    getProjectsByFilterKey,
    getPublicProjectsOnly,
    getProjectsIFollow,
    getProjectsIResearch,
    getProjectsIInitiated,
    getProjectsIInvenst,
    getProjectsISupervise,
    getProjectsIDevelop,
    getProjectsICollaborate
}