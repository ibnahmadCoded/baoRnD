const express = require('express')
const router = express.Router()
const { addRequest,
        deleteRequest,
        getProjectRequests,
        getMyRequests,
        updateRequest } = require('../controllers/requestController')

const { protect } = require('../middleware/authMiddleware')

// Get all request for a project. 
router.get('/', protect, getMyRequests)

// Get all request for a project. 
router.get('/getprojectrequests/:project', protect, getProjectRequests)

// Add a request to a user. 
router.post('/', protect, addRequest)

// Update request
router.put('/:id', protect, updateRequest) 

// Delete a request. 
router.delete('/:id', protect, deleteRequest)

module.exports = router