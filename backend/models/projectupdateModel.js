const mongoose = require('mongoose')

const projectupdateSchema = mongoose.Schema({
    user: {
        // The id of the user making the update. Only current user. 
        // Only a researcher, developer, initiator or supervisor can push an update to a project
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // acts as foreign key, i.e. linked to the userModel, which is exported as User. 
    },
    project: {
        // The id of the project for which an update is being pushed
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project' // acts as foreign key, i.e. linked to the projectModel, which is exported as Project. 
    },
    type: {
        // the type of the update can be either Note (always hidden, only the updater can see it), 
        // Hidden (only people with viewership can see) or Normal (default value, visible to ppl wiht viewership on project). 
        // future imporvement is to be able to hide specific parts of an update (e.g. hide a calculaiton or image, etc)
        type: String,
        required: [true, 'Please add update type']
    },
    content: {
        // The content of the update
        type: String,
        required: [true, 'Please add content of your update']
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Projectupdate', projectupdateSchema)