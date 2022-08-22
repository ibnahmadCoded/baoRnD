const express = require('express')
const router = express.Router()
const { makePayment } = require('../controllers/paymentController')

const { protect } = require('../middleware/authMiddleware')


// Add a notification for a user 
router.post('/', protect, makePayment)


module.exports = router