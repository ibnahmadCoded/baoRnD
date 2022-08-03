const express = require('express')
const router = express.Router()
const { addReaction,
        getReactions,
        deleteReaction } = require('../controllers/commentreactionController')

const { protect } = require('../middleware/authMiddleware')

// Get all reactions on a comment. If you cant see a comment, you shouldnt be able to see reactions on it (to be done in frontend)
router.get('/', protect, getReactions)

// Add a reaction on a comment. If you cant see a comment, you shouldnt be able to react on it (to be done in frontend) 
router.post('/', protect, addReaction)

// Delete a reaction on a comment. Only the user who made it can delete
router.delete('/', protect, deleteReaction)

module.exports = router