const mongoose = require('mongoose')

const userFeedbackSchema = mongoose.Schema({
    user: {
        // The id of the user giving the feedback
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // acts as foreign key, i.e. linked to the userModel, which is exported as User. 
    },
    feedback: {
        // the id of the feedback
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please add a feedback'],
        ref: 'Feedback'
    },
    status: {
        // true if user has voted. false if not voted
        type: Boolean,
        default: false,
        required: [true, 'Please add upvote status']
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Userfeedback', userFeedbackSchema)