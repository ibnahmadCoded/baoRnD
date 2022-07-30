const express = require('express')
const router = express.Router()
const { getProjects, 
        getMyProjects, 
        getProjectsIFollow, 
        getAProject, 
        createProject, 
        updateProject, 
        deleteProject,
        getProjectsByFilterKey } = require('../controllers/projectController')

// get all public projects, including private projects of current user if user is logged in. 
router.get('/', getProjects)

// fileter function: Get all projects (all public projects, including private projects of current user if user is logged in) in a category/field/tags(later), etc
router.get('/filter/:key', getProjectsByFilterKey)

// get all user's projects, including projects in which they have full view. See projectController for details.
router.get('/myprojects', getMyProjects)

// get all projects the user is following. ??? move to stakeholder routes?
router.get('/projectsifollow', getProjectsIFollow)

// get a project
router.get('/:id', getAProject)

// create a project. 
router.post('/', createProject)

// update a project. 
router.put('/:id', updateProject)

// Delete a project. 
router.delete('/:id', deleteProject)

// get all followers of a project. ??? move to stakeholder routes?
//router.get('/followers', (req, res) => {
//    res.status(200).send({ message: 'Get all followers of project' })
//})
 
module.exports = router