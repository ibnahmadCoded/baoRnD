const express = require('express')
const router = express.Router()
const { saveFeedback, getFeedbacks } = require('../controllers/feedbackController')

const {protect} = require('../middleware/authMiddleware')

router.post('/', protect, saveFeedback)
router.get('/', protect, getFeedbacks)

module.exports = router