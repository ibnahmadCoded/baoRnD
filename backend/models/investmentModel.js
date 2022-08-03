const mongoose = require('mongoose')

const investmentSchema = mongoose.Schema({
    user: {
        // The id of the user doing the investment. Only current user
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // acts as foreign key, i.e. linked to the userModel, which is exported as User. 
    },
    project: {
        // The id of the project being invested in
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project' // acts as foreign key, i.e. linked to the projectModel, which is exported as Project. 
    },
    amounts: [{
        // investments made by user in project. takes the form: 
        type: Number,
        required: [true, 'Please add amount']
    }],
}, {
    timestamps: true
})

module.exports = mongoose.model('Investment', investmentSchema)