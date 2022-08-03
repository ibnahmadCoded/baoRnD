const mongoose = require('mongoose')

const projectapplicationSchema = mongoose.Schema({
    user: {
        // The id of the user applying to join the project. Only current user
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // acts as foreign key, i.e. linked to the userModel, which is exported as User. 
    },
    project: {
        // The id of the project being applied to join
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project' // acts as foreign key, i.e. linked to the projectModel, which is exported as Project. 
    },
    type: {
        // while the type can be either Collaborator, Researcher, Developer or Supervisor, which are the options the user can apply to a project for.
        type: String,
        required: [true, 'Please add what you are applying as']
    },
    message: {
        // Message is a simple answer to the question: why do you want to join the project?
        type: String,
    },
    reply: {
        // The reply to the Application (can be "Accepted", "Rejected" or pending)
        type: String,
        default: "Pending"
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Projectapplication', projectapplicationSchema)