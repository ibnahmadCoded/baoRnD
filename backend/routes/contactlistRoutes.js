const express = require('express')
const router = express.Router()
const { addContact,
        getContacts,
        acceptContact,
        deleteContact } = require('../controllers/contactlistController')

const { protect } = require('../middleware/authMiddleware')

// Get all contacts of a user. Current user
router.get('/', protect, getContacts)

// Add a contact for a user, as request. In fronend, and unaccepted request shows as pending addition. Accepted ones show in contact list 
router.post('/', protect, addContact)

// Accept for a user to add you to thier contact list 
router.put('/:id', protect, acceptContact)

// Delete a contact
router.delete('/:id', protect, deleteContact)

module.exports = router