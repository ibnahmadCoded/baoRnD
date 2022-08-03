const express = require('express')
const router = express.Router()
const { addInvestment,
        getMyInvestments,
        getProjectInvestments, } = require('../controllers/investmentController')

const { protect } = require('../middleware/authMiddleware')

// Get all investments of a user
router.get('/', protect, getMyInvestments)

// Get all investments of a project. Only the initiator of a project can use this route to see all investments on a project.
router.get('/projectinvestments', protect, getProjectInvestments)

// Add an investment. 
router.post('/', protect, addInvestment)

module.exports = router