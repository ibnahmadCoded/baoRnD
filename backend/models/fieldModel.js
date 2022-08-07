const mongoose = require('mongoose')

const fieldSchema = mongoose.Schema({
    project: {
        // The id of the project 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project' // acts as foreign key, i.e. linked to the projectModel, which is exported as Project. 
    },
    fields: [{
        // the field of the project. 
        // the field can be anything, like Chemistry, Chemical Engineering, etc. Fields should be selected from a dropdown list provided in the frontend
        type: String,
        required: [true, 'Please set the field for the project']
    }],
}, {
    timestamps: true
})

module.exports = mongoose.model('Field', fieldSchema)