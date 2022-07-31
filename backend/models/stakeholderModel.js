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
        // All current types: Initiator, Investor, Follower, Supervisor (has full view of project), Researcher (has full view, can push updates)
        type: String,
        required: [true, 'Please provide the stakeholder type']
    }],
    viewership: {
        // yes(true) or no(false)
        type: Boolean,
        required: [true, 'Please set the viewership status of the stakeholder']
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Stakeholder', projectSchema)