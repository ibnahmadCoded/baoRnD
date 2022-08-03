const express = require('express')
const router = express.Router()
const { addReaction,
        getReactions,
        deleteReaction } = require('../controllers/updatereactionController')

const { protect } = require('../middleware/authMiddleware')

// Get all reactions on an update. If you cant see an update, you shouldnt be able to see reactions on it (to be done in frontend)
router.get('/', protect, getReactions)

// Add a reaction on an update. If you cant see an update, you shouldnt be able to react on it (to be done in frontend) 
router.post('/', protect, addReaction)

// Delete a reaction on an update. Only the user who made it can delete
router.delete('/', protect, deleteReaction)

module.exports = router