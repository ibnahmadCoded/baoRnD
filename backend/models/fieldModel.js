const mongoose = require('mongoose')

const fieldSchema = mongoose.Schema({
    project: {
        // The id of the project or user
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // acts as foreign key, i.e. linked to the userModel, which is exported as User. can also be linked to Project (but it works now. xD)
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