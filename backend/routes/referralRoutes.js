const express = require('express')
const router = express.Router()
const { addReferral,
        removeReferral,
        getReferrals, } = require('../controllers/referralController')

const { protect } = require('../middleware/authMiddleware')

// Get all referrals for a user. // can be shown under profile section.
router.get('/', protect, getReferrals)

// Add a referral to a user. 
router.post('/', protect, addReferral)

// Delete a user`s referral referral 
router.delete('/:id', protect, removeReferral)

module.exports = router