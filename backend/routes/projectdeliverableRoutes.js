const express = require('express')
const router = express.Router()
const { addDeliverable,
        removeDeliverable,
        getDeliverables,
        updateDeliverable, } = require('../controllers/projectdeliverableController')

const { protect } = require('../middleware/authMiddleware')

// Get all tags for a project. 
router.get('/:project', protect, getDeliverables)

// Add a tag to a project. 
router.post('/', protect, addDeliverable)

// Delete a tag from a project. 
router.delete('/:id', protect, removeDeliverable)

// update deliverable with delivered or not. 
router.put('/:id', protect, updateDeliverable)

module.exports = router