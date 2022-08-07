const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    item: {
        // The id of the project or user
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // acts as foreign key, i.e. linked to the userModel, which is exported as User. can also be linked to Project (but it works now. xD)
    },
    type: {
        // Is it a project category or user category
        type: String,
        required: [true, 'Please provide the stakeholder type']
    },
    category: [{
        // the category. currently supported are: 
        // for users: Normal, Investor, Researcher, professor, for now. More can be added later
        // for projects: Fund (seeking fund), Res (seeking researcher(s) researcher can be inidivual or company, Collab (seeking to collaborate with other,
        // or Basic (just seeking to store project data to publisize it or not)))
        type: String,
        required: [true, 'Please set the category of the user or project']
    }],
}, {
    timestamps: true
})

module.exports = mongoose.model('Category', categorySchema)