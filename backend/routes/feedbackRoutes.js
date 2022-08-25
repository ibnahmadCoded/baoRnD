const express = require('express')
const router = express.Router()
const { saveFeedback, getFeedbacks, upvoteFeedback, updateFeedback } = require('../controllers/feedbackController')

const {protect} = require('../middleware/authMiddleware')

router.post('/', protect, saveFeedback)
router.get('/', protect, getFeedbacks)
router.put('/:id', protect, upvoteFeedback)
router.put('/update/:id', protect, updateFeedback)

module.exports = router