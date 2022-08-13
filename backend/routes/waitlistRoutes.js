const express = require('express')
const router = express.Router()
const { saveEmails, getEmails, sendEmail } = require('../controllers/waitlistController')

const {protect} = require('../middleware/authMiddleware')

router.post('/', saveEmails)
router.post('/sendemail', protect, sendEmail)
router.get('/', protect, getEmails)

module.exports = router