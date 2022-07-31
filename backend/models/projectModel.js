const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // acts as foreign key, i.e. linked to the userModel, which is exported as User
    },
    visibility: {
        type: String,
        required: [true, 'Please provide the visibility status of your project']
    },
    detail: {
        type: Object,
        required: [true, 'Project detail cannot be empty']
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Project', projectSchema)