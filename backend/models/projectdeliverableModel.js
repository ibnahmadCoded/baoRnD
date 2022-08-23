const mongoose = require('mongoose')

const projectdeliverableSchema = mongoose.Schema({
    project: {
        // The id of the project 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project' // acts as foreign key, i.e. linked to the projectModel, which is exported as Project. 
    },
    deliverable: {
        // the deliverables of the project. 
        type: String,
        required: [true, 'Please set the deliverable for the project']
    },
    delivered: {
        // the deliverable has been delivered. 
        type: Boolean,
        default: false,
        required: [true, 'Please set the deliverable for the project']
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Projectdeliverable', projectdeliverableSchema)