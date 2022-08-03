const express = require('express')
const router = express.Router()
const { updateMetrics, getMetrics } = require('../controllers/metricController')

const {protect} = require('../middleware/authMiddleware')

router.post('/', updateMetrics)

// get metrics. Only admin user should be able to use this route
router.get('/', protect, getMetrics)

module.exports = router