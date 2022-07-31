const express = require('express')
const router = express.Router()
const { saveEmails, getEmails } = require('../controllers/newslettersignupController')

const {protect} = require('../middleware/authMiddleware')

router.post('/', protect, saveEmails)
router.get('/', protect, getEmails)

module.exports = router