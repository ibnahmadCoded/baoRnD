const express = require('express')
const router = express.Router()
const { saveEmails, getEmails } = require('../controllers/waitlistController')

const {protect} = require('../middleware/authMiddleware')

router.post('/', saveEmails)
router.get('/', protect, getEmails)

module.exports = router