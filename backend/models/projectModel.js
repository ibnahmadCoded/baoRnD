const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
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