const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    user: {
        // The id of the user
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // acts as foreign key, i.e. linked to the userModel, which is exported as User. 
    },
    category: [{
        // the category. currently supported are: 
        // for users: Normal, Investor, Researcher, professor, for now. More can be added later
        type: String,
        required: [true, 'Please set the category of the user']
    }],
}, {
    timestamps: true
})

module.exports = mongoose.model('Category', categorySchema)