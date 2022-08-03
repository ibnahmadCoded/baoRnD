const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getProfile, getMyProfile, updateProfile, verifyEmail } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/verifyemail', verifyEmail)
router.put('/', protect, updateProfile)
router.post('/login', loginUser)
router.get('/profile', protect, getMyProfile)
router.get('/profile/:id', getProfile)

module.exports = router