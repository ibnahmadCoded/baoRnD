const mongoose = require('mongoose')

const projectgoalSchema = mongoose.Schema({
    project: {
        // The id of the project 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project' // acts as foreign key, i.e. linked to the projectModel, which is exported as Project. 
    },
    goal: {
        // the goals of the project. 
        type: String,
        required: [true, 'Please set the goal for the project']
    },
    completed: {
        // the goals of the project. 
        type: Boolean,
        default: false,
        required: [true, 'Please set the goal completion status']
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Projectgoal', projectgoalSchema)