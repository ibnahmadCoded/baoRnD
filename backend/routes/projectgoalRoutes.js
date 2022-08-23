const express = require('express')
const router = express.Router()
const { addGoal,
        removeGoal,
        getGoals, 
        updateGoal, } = require('../controllers/projectgoalController')

const { protect } = require('../middleware/authMiddleware')

// Get all goals for a project. 
router.get('/:project', protect, getGoals)

// Add a goal to a project. 
router.post('/', protect, addGoal)

// Update a goal completed or uncompleted. 
router.put('/:id', protect, updateGoal)

// Delete a goal from a project. 
router.delete('/:id', protect, removeGoal)

module.exports = router