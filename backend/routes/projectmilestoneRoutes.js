const express = require('express')
const router = express.Router()
const { addProjectmilestone,
        removeProjectmilestone,
        getProjectmilestones, } = require('../controllers/projectmilestoneController')

const { protect } = require('../middleware/authMiddleware')

// Get all milestone for a project. 
router.get('/', protect, getProjectmilestones)

// Add a milestone to a project. 
router.post('/', protect, addProjectmilestone)

// Delete a milestone from a project. 
router.delete('/', protect, removeProjectmilestone)

module.exports = router