const express = require('express')
const router = express.Router()
const { addTag,
        removeTag,
        getTags, } = require('../controllers/tagController')

const { protect } = require('../middleware/authMiddleware')

// Get all tags for a project. 
router.get('/', protect, getTags)

// Add a tag to a project. 
router.post('/', protect, addTag)

// Delete a tag from a project. 
router.delete('/', protect, removeTag)

module.exports = router