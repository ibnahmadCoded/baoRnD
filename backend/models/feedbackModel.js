const mongoose = require('mongoose')

const feedbackSchema = mongoose.Schema({
    user: {
        // The id of the user giving the feedback
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // acts as foreign key, i.e. linked to the userModel, which is exported as User. 
    },
    feedback: {
        type: String,
        required: [true, 'Please add a feedback']
    },
    upvotes: {
        type: Number,
        default: 0,
        required: [true, 'Please add an upvote']
    },
    underreview: {
        // is this feedback under review
        type: Boolean,
        default: false,
        required: true
    },
    resolved: {
        // has the feedback been resolved
        type: Boolean,
        default: false,
        required: true
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Feedback', feedbackSchema)