const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    user: {
        // The user who is adding another user (contact)
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // acts as foreign key, i.e. linked to the userModel, which is exported as User. 
    },
    contact: {
        // The above user`s contact who is being added (sent a request first)
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // acts as foreign key, i.e. linked to the userModel, which is exported as User. 
    },
    accepted: {
        // Has the contact acceptedrequest to add them to the user`s contact list?
        type: Boolean,
        required: true,
        default: false
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Contact', contactSchema)