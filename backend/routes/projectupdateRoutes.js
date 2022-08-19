const express = require('express')
const router = express.Router()
const { addUpdate,
        getProjectUpdates,
        getMyUpdates, 
        deleteUpdate,
        getAnUpdate,
        editUpdate } = require('../controllers/projectupdateController')

const { protect } = require('../middleware/authMiddleware')

// Get all updates made by a user
router.get('/', protect, getMyUpdates) 

// Get all updates on a project. 
router.get('/getprojectupdates/:project', protect, getProjectUpdates)

// Get an update
router.get('/:id', protect, getAnUpdate) 

// Add an update for project 
router.post('/', protect, addUpdate) 

// Update a project update after the edit. 
// Only the user who created the update can do this. 
router.put('/:id', protect, editUpdate)  

// Delete an update of a user from a project. Only the user who made it can delete
router.delete('/:id', protect, deleteUpdate) 

module.exports = router