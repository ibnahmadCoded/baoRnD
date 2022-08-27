const express = require('express')
const router = express.Router()
const { addNotification,
        getNotifications,
        updateNotification, 
        deleteNotification} = require('../controllers/notificationController')

const { protect } = require('../middleware/authMiddleware')

// Get all notifications for a user
router.get('/', protect, getNotifications)

// Add a notification for a user 
router.post('/', addNotification)

// Update a notification as seen.
router.put('/:id', updateNotification)

// Delete a notification.
router.delete('/:id', protect, deleteNotification)

module.exports = router