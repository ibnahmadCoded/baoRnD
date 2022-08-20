const express = require('express')
const router = express.Router()
const { addApplication,
        getMyApplications,
        getProjectapplications, 
        deleteApplication,
        getApplication,
        updateApplication } = require('../controllers/projectapplicationController')

const { protect } = require('../middleware/authMiddleware')

// Get all applications of a user
router.get('/', protect, getMyApplications) 

// Get all applications to a project. Only the initiator of a project can use this route to see all applications to join a project.
// make sure to filter foronly pending applications in frontend. No need to show applications already replied to.
router.get('/getprojectapplications/:project', protect, getProjectapplications)

// Get an application
router.get('/:id', protect, getApplication) 

// Add an application of user for project 
router.post('/', protect, addApplication) 

// Update an application of user for project (update with the reply only). Applications cant be updated once sent. 
// But the project owner can update the reply (app result) status 
router.put('/:id', protect, updateApplication) 

// Delete an application of a user to a project. Only the user who applied can delete
router.delete('/:id', protect, deleteApplication) 

module.exports = router