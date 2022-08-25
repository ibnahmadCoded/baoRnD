const express = require('express')
const router = express.Router()
const { saveUserFeedback, getUserFeedback, saveStatus } = require('../controllers/userFeedbackController')

const {protect} = require('../middleware/authMiddleware')

router.post('/', protect, saveUserFeedback)
router.get('/', protect, getUserFeedback)
router.put('/:id', protect, saveStatus)

module.exports = router