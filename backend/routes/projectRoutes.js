const express = require('express')
const router = express.Router()
const { getProjects, 
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
} = require('../controllers/projectController')

const { protect } = require('../middleware/authMiddleware')

// get all public projects, including private projects of current user if user is logged in. 
router.get('/', protect, getProjects)

// get all public projects, if user is not logged in. 
router.get('/publiconly', getPublicProjectsOnly) 

// fileter function: Get all projects (all public projects, including private projects of current user if user is logged in) in a category/field/tags(later), etc
router.get('/filter/:key', protect, getProjectsByFilterKey)     

// get all user's projects, including projects in which they have full view. See projectController for details.
router.get('/myprojects', protect, getMyProjects)       

// get all projects the loggedin user is following. 
router.get('/projectsifollow', protect, getProjectsIFollow) 

// get all projects on which the user is a reseracher.
router.get('/projectsiresearch', protect, getProjectsIResearch) 

// get all projects on which the user is an initiator.
router.get('/projectsiinitiated', protect, getProjectsIInitiated)       

// get all projects on which the user is an investot.
router.get('/projectsiinvest', protect, getProjectsIInvenst)    

// get all projects on which the user is a supervisor.
router.get('/projectsisupervise', protect, getProjectsISupervise) 

// get all projects on which the user is a developer on. Developer in the sense of cocntractor (company/individual) developing a project/product not programmer
router.get('/projectsidevelop', protect, getProjectsIDevelop) 

// get all projects on which the user is a collaborator.
router.get('/projectsicollaborate', protect, getProjectsICollaborate) 

// get a project
router.get('/:id', protect, getAProject) 

// create a project.
router.post('/', protect, createProject) 

// update a project. 
router.put('/:id', protect, updateProject) 

// Delete a project. 
router.delete('/:id', protect, deleteProject) 

// get all followers of a project. ??? move to stakeholder routes?
//router.get('/followers', (req, res) => {
//    res.status(200).send({ message: 'Get all followers of project' })
//})
 
module.exports = router