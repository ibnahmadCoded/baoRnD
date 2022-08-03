const express = require('express')
const router = express.Router()
const { addMetrics, getMetrics } = require('../controllers/dailymetricController')

const {protect} = require('../middleware/authMiddleware')

router.post('/', protect, addMetrics)

// get metrics. Only admin user should be able to use this route
router.get('/', protect, getMetrics)

module.exports = router