const express = require('express')
const router = express.Router()
const { uploadFile } = require('../controllers/uploadFileController')

const { protect } = require('../middleware/authMiddleware')

router.post('/', protect, uploadFile)

module.exports = router