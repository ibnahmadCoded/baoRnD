const mongoose = require('mongoose')

const requestSchema = mongoose.Schema({
    project: {
        // The id of the project 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project' // acts as foreign key, i.e. linked to the projectModel, which is exported as Project. 
    },
    user: {
        // The id of the user making the request. Only current user
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // acts as foreign key, i.e. linked to the userModel, which is exported as User. 
    },
    to: {
        // The id of the user receiving the request
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    },
    username: {
        // the name of the user making the request
        type: String,
        required: true
    },
    toname: {
        // the name of the user receiving the request
        type: String,
        required: true
    },
    projectname: {
        // the title of the project on which the request is being made
        type: String,
        required: true
    },
    type: {
        // what is the type of request. Currently supported types include:
        // Invoice (when a user requests a Bill or invoice from another user)
        // Payment (when a user requests for a payment)
        // Other (other kinds of request)
        type: String,
        required: true
    },
    requestMsg: {
        // the request itself (usually text message). 
        type: String,
        required: [true, 'Please set the tag for the project']
    },
    amount: {
        // the amount requested if type is Payment. 
        type: Number,
    },
    replied: {
        // has the request been replied or not
        type: Boolean,
        required: true,
        default: false
    },
    reply: {
        // the reply to the request,
        type: String,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Request', requestSchema)