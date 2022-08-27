const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema({
    user: {
        // The id of the user to be notified. Only current user. 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // acts as foreign key, i.e. linked to the userModel, which is exported as User. 
    },
    item: {
        // The id of the item about which notification is made, e.g. A user followed your project, item would be the project
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project' // acts as foreign key, i.e. linked to the updatecommentModel, which is exported as Updatecomment. 
    },
    type: {
        // Used in frontend. Current types: 
        // PasswordReset (You reset your password) 
        // Signup (welcome to baoRnD), 
        // Referral (thank you for referring someone to baoRnD), 
        // ReferralSignup (a user <- [link to the user] u referred has joined baoRnD. Thank you for the envangelism.)
        // ProjectInit (your project is ready)
        // Investment (a user invested in your project)
        // ProjectApplication (a user applied to your project)
        // ProjectUpdate (You edited your project) 
        // ContactRequest (A user sent you a contact request <- [link to the request, stored in item])
        // ContactRequestAccepted (User A <- [link to the user] accepted your contact addition request, and has been added to your contact list <- [link to the contact list])
        // ContactAdded (User A <- [link to the user] has been added to your contact list <- [link to the contact list])
        // ProjectApplicationRejected (your application to project(... project link) has been rejected)
        // ProjectApplicationAccepted (your application to project(... project link) has been accepted)
        // Request (someone sent you a request)
        // RequestReply (your request has a reply)
        // UpdatePush (a new update (update is linked) was submitted to a project)
        // UpdateComment (a comment was made on your update <---- link to update)
        // message sent in frontend
        // Add 3 more types every month with new product update
        type: String,
        required: [true, 'Please add a reaction']
    },
    seen: {
        // Has the notification been viewed or not,  true or false
        type: Boolean,
        required: [true, 'Please add a reaction'],
        default: false
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Notification', notificationSchema)