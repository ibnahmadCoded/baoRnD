const mongoose = require('mongoose')

const updatereactionSchema = mongoose.Schema({
    user: {
        // The id of the user making the reaction on the update. Only current user. 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // acts as foreign key, i.e. linked to the userModel, which is exported as User. 
    },
    update: {
        // The id of the update for which a reaction is being made
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Projectupdate' // acts as foreign key, i.e. linked to the projectupdateModel, which is exported as Projectupdate. 
    },
    reactions: [{
        // Something like the reactions in linkedIn/FB, Twitter, etc. Takes the form [Awesome, Like, Underwhelming, Mindblowing, etc]
        type: String,
        required: [true, 'Please add a reaction']
    }],
}, {
    timestamps: true
})

module.exports = mongoose.model('Updatereaction', updatereactionSchema)