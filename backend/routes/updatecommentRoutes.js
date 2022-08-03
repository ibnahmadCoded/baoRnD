const express = require('express')
const router = express.Router()
const { addComment,
        getComments,
        deleteComment,
        editComment } = require('../controllers/updatecommentController')

const { protect } = require('../middleware/authMiddleware')

// Get all comments on an update. If you cant see an update, you shouldnt be able to see comments on it (to be done in frontend)
router.get('/', protect, getComments)

// Add a comment on an update. If you cant see an update, you shouldnt be able to comment on it (to be done in frontend) 
router.post('/', protect, addComment)

// Update a comment on an update after the edit. 
// Only the user who made the comment can do this. 
router.put('/:id', protect, editComment)

// Delete a comment on an update. Only the user who made it can delete
router.delete('/:id', protect, deleteComment)

module.exports = router