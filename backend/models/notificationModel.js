const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema({
    user: {
        // The id of the user manking the reaction on the comment. Only current user. 
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
        // Used in frontend. Current types: Signup (welcome message), Referral (thank you message), ProjectInit (your project is ready)
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