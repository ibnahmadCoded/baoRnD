const mongoose = require('mongoose')

const commentreactionSchema = mongoose.Schema({
    user: {
        // The id of the user manking the reaction on the comment. Only current user. 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // acts as foreign key, i.e. linked to the userModel, which is exported as User. 
    },
    comment: {
        // The id of the comment for which a reaction is being made
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Updatecomment' // acts as foreign key, i.e. linked to the updatecommentModel, which is exported as Updatecomment. 
    },
    reactions: [{
        // Something like the reactions in linkedIn/FB, Twitter, etc. Takes the form [Awesome, Like, Underwhelming, Mindblowing, etc]
        type: String,
        required: [true, 'Please add a reaction']
    }],
}, {
    timestamps: true
})

module.exports = mongoose.model('Commentreaction', commentreactionSchema)