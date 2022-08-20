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
    category: {
        // for projects: Fund (seeking fund), Res (seeking researcher(s) researcher can be inidivual or company, Collab (seeking to collaborate with other,
        // or Basic (just seeking to store project data))), Dev (seeking a developer), Pub (I want to publicize my project), Sup (seeking a supervisor)
        type: String,
        required: [true, 'Project category cannot be empty']
    },
    amount: {
        // the amount of investment the user is seeking if the category is fund
        type: Number
    },
    acceptapps: {
        // does the owner want to accept applications or investments?
        type: Boolean,
        required: true
    },
    appmsg: {
        // project owner`s message to potential applicants
        type: String,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Project', projectSchema)