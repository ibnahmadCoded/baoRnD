const mongoose = require('mongoose')

const projectmiletoneSchema = mongoose.Schema({
    project: {
        // The id of the project or user
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project' // acts as foreign key, i.e. linked to the userModel, which is exported as User. can also be linked to Project (but it works now. xD)
    },
    milestones: [{
        // the project milestones, takes the form: {milestone: "", dueDate: "", note: ""}
        // e.g.{milestone: "Get feedback", dueDate: "02/08/2022 at 20:00", note: "Contact Mr X for feedback about recent update"}
        type: Object,
        required: [true, 'Please add project milestone']
    }],
}, {
    timestamps: true
})

module.exports = mongoose.model('Projectmilestone', projectmiletoneSchema)