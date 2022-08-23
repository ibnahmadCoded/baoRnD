const express = require('express')
const router = express.Router()
const { addField,
        removeField,
        getFields, } = require('../controllers/fieldController')

const { protect } = require('../middleware/authMiddleware')

// Get all fields for a project. 
router.get('/:project', protect, getFields)

// Add a field to a project. 
router.post('/', protect, addField)

// Delete a field from a project. 
router.delete('/', protect, removeField)

module.exports = router