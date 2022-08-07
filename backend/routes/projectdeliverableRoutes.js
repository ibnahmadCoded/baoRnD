const express = require('express')
const router = express.Router()
const { addDeliverable,
        removeDeliverable,
        getDeliverables, } = require('../controllers/projectdeliverableController')

const { protect } = require('../middleware/authMiddleware')

// Get all tags for a project. 
router.get('/', protect, getDeliverables)

// Add a tag to a project. 
router.post('/', protect, addDeliverable)

// Delete a tag from a project. 
router.delete('/', protect, removeDeliverable)

module.exports = router