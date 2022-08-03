const asyncHandler = require('express-async-handler')

const Notification = require('../models/notificationModel')
const User = require('../models/userModel')
const Project = require('../models/projectModel')

// desc:    Get all notifications for a user 
// route:   GET /api/notifications
// access:  Private 
// dev:     Aliyu A.   
const getNotifications = asyncHandler(async (req, res) => {
    // get all reactions of a user
    const notifications = await Notification.find({ user: req.user.id })

    res.status(200).json(notifications)
    
})

// desc:    Add a notification for a user 
// route:   POST /api/notifications
// access:  Private 
// dev:     Aliyu A.   
const addNotification = asyncHandler(async (req, res) => {
    if(!req.body.item){
        res.status(400)
        throw new Error('Please provide the id of the connected item')
    }

    if(!req.body.type){
        res.status(400)
        throw new Error('Please provide the notification type')
    }

    if(!req.body.user){
        res.status(400)
        throw new Error('Please provide the user to be notified')
    }

    // check if user to be notified exists
    const user = await User.findOne({ _id: req.body.user })
    if(!user){
        res.status(400)
        throw new Error('User does not exist')
    }

    // check if project exists for ProjectInit notification
    if(req.body.type === "ProjectInit"){
        // get the project
        const project = await Project.findOne({ _id: req.body.item })
        if(!project){
            res.status(400)
            throw new Error('Project item does not exist')
        }
    }

    // check if user exists for Signup notification
    if(req.body.type === "Signup"){
        // get the user
        const u = await User.findOne({ _id: req.body.item })
        if(!u){
            res.status(400)
            throw new Error('User item does not exist')
        }
    }

    // no need to check for referral since the referred user (item) isnt registered yet! item is the email being referred
    // add others later.

    // we create the notification
    const notification = await Notification.create({
        user: req.body.user,
        item: req.body.item,
        type: req.body.type,
        seen: false
    })

    res.status(200).json(notification)   
})

// desc:    // Update a notification as seen.
// route:   GET /api/notifications/:id
// access:  Private 
// dev:     Aliyu A.   
const updateNotification = asyncHandler(async (req, res) => {
    const updatedNotification = await Notification.findByIdAndUpdate(req.params.id, {seen: true}, {
        new: true,
    })

    res.status(200).json(updatedNotification)
    
})

module.exports = {
    addNotification,
    getNotifications,
    updateNotification
}