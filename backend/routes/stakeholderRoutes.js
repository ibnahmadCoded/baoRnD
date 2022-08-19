const express = require('express')
const router = express.Router()
const { addStakeholder,
        removeStakeholder,
        getStakeholders,
        getStake } = require('../controllers/stakeholderController')

const { protect } = require('../middleware/authMiddleware')

// Get the stake of a user in a project. 
router.get('/getstake/:project', protect, getStake)

// Get all stakeholders for a project. 
router.get('/:project', protect, getStakeholders)

// Add a Stakeholder to a project. 
router.post('/', protect, addStakeholder)

// Delete a Stakeholder from a project. 
router.delete('/', protect, removeStakeholder)

module.exports = router