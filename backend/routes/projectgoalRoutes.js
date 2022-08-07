const express = require('express')
const router = express.Router()
const { addGoal,
        removeGoal,
        getGoals, } = require('../controllers/projectgoalController')

const { protect } = require('../middleware/authMiddleware')

// Get all tags for a project. 
router.get('/', protect, getGoals)

// Add a tag to a project. 
router.post('/', protect, addGoal)

// Delete a tag from a project. 
router.delete('/', protect, removeGoal)

module.exports = router