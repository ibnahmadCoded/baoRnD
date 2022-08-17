const mongoose = require('mongoose')

const projectmaterialsSchema = mongoose.Schema({
    project: {
        // The id of the project or user
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project' // acts as foreign key, i.e. linked to the userModel, which is exported as User. can also be linked to Project (but it works now. xD)
    },
    visibility: {
        // can be Hidden or Visible
        type: String,
        required: [true, 'Please add visibility for material']
    },
    material: {
        // the project materials, e.g. external link to a repo/info, prensentation slides, etc. It can also be documents, images, etc uploaded by the user
        // for now, only links are allowed. Images and others are later updates. Can store links to files here annd the file is stored on a server somewhere.
        // Visibility can be Hidden or Visible. Hidden materials are not shown in project page. Only the project ownner can see them
        type: String,
        required: [true, 'Please add project material']
    },
    type: {
        type: String,
        required: [true, 'Please add project type']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Projectmaterials', projectmaterialsSchema)