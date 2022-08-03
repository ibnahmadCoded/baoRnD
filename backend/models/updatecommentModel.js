const mongoose = require('mongoose')

const updatecommentSchema = mongoose.Schema({
    user: {
        // The id of the user commenting on the update. Only current user. 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // acts as foreign key, i.e. linked to the userModel, which is exported as User. 
    },
    update: {
        // The id of the update for which an comment is being made
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Projectupdate' // acts as foreign key, i.e. linked to the projectupdateModel, which is exported as Projectupdate. 
    },
    comment: {
        // The content of the update
        type: String,
        required: [true, 'Please add content of your comment']
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Updatecomment', updatecommentSchema)