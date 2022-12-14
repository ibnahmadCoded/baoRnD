const mongoose = require('mongoose')

const tagSchema = mongoose.Schema({
    project: {
        // The id of the project 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project' // acts as foreign key, i.e. linked to the projectModel, which is exported as Project. 
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