const express = require('express')
const router = express.Router()
const { registerUser, 
        loginUser, 
        getProfile, 
        getMyProfile, 
        updateProfile, 
        verifyEmail, 
        forgotPassword, 
        resetPassword, 
        registerReferredUser,
        getUsers } = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')
const { isResetTokenValid } = require('../middleware/resettokenMiddleware')

router.post('/', registerUser)
router.post('/referralsignup', registerReferredUser)
router.post('/verifyemail', verifyEmail)
router.post('/forgotpassword', forgotPassword)
router.post('/resetpassword', isResetTokenValid, resetPassword)
router.put('/', protect, updateProfile)
router.get('/', protect, getUsers)
router.post('/login', loginUser)
router.get('/profile', protect, getMyProfile)
router.get('/profile/:id', getProfile)

module.exports = router