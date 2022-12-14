const express = require('express')
const router = express.Router()
const { addProjectmaterial,
        removeProjectmaterial,
        getProjectmaterials, } = require('../controllers/projectmaterialController')

const { protect } = require('../middleware/authMiddleware')

// Get all materials for a project. 
router.get('/:project', protect, getProjectmaterials)

// Add a material to a project. 
router.post('/', protect, addProjectmaterial)

// Delete a material from a project. 
router.delete('/:id', protect, removeProjectmaterial)

module.exports = router