const express = require('express')
const router = express.Router()
const { addCategory,
        removeCategory,
        getCategories, } = require('../controllers/categoryController')

const { protect } = require('../middleware/authMiddleware')

// Get all categories for a project/user. 
router.get('/', protect, getCategories)

// Add a category to a project/user. 
router.post('/', protect, addCategory)

// Delete a category from a project/user. 
router.delete('/', protect, removeCategory)

module.exports = router