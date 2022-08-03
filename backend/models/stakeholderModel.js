const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project' // acts as foreign key, i.e. linked to the projectModel, which is exported as Project
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // acts as foreign key, i.e. linked to the userModel, which is exported as User
    },
    type: [{
        // All current types: Developer (as in the contractor on development project, not programmer ) Initiator, Investor, Follower,... 
        // Supervisor (has full view of project), Researcher (has full view, can push updates), Collaborator
        type: String,
        required: [true, 'Please provide the stakeholder type']
    }],
    viewership: {
        // can the user view the project? yes(true) or no(false)
        type: Boolean,
        required: [true, 'Please set the viewership status of the stakeholder']
    },
    update: {
        // can the user update the project? yes(true) or no(false)
        type: Boolean,
        required: [true, 'Please set the update status of the stakeholder']
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Stakeholder', projectSchema)