const mongoose = require('mongoose')

const tagSchema = mongoose.Schema({
    project: {
        // The id of the project or user
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // acts as foreign key, i.e. linked to the userModel, which is exported as User. can also be linked to Project (but it works now. xD)
    },
    tags: [{
        // the tag of the project. 
        // the tag can be anything, like #human_learning. Note, tags are stores in collection without the # character
        type: String,
        required: [true, 'Please set the tag for the project']
    }],
}, {
    timestamps: true
})

module.exports = mongoose.model('Tag', tagSchema)