const express = require('express')
const router = express.Router()
const { subscribe } = require('../controllers/subscribeController')

// Add a tag to a project. 
router.post('/', subscribe)

module.exports = router