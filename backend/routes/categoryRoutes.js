const express = require('express')
const router = express.Router()
const { addCategory,
        removeCategory,
        getCategories, } = require('../controllers/categoryController')

const { protect } = require('../middleware/authMiddleware')

// Get all categories for a user. 
router.get('/:user', protect, getCategories)

// Add a category to a user. 
router.post('/', protect, addCategory)

// Delete a category from a user. 
router.delete('/', protect, removeCategory)

module.exports = router