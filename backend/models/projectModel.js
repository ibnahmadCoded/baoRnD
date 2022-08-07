const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // acts as foreign key, i.e. linked to the userModel, which is exported as User
    },
    title: {
        type: String,
        required: [true, 'Please provide project title']
    },
    overview: {
        type: String,
        required: [true, 'Please provide project overview']
    },
    moreinfo: {
        type: String,
    },
    visibility: {
        type: String,   // can be Public or Private
        required: [true, 'Please provide the visibility status of your project']
    },
    duration: {
        type: String,
        required: [true, 'Project duration cannot be empty']
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Project', projectSchema)