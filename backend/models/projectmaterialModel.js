const mongoose = require('mongoose')

const projectmaterialsSchema = mongoose.Schema({
    project: {
        // The id of the project or user
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project' // acts as foreign key, i.e. linked to the userModel, which is exported as User. can also be linked to Project (but it works now. xD)
    },
    materials: [{
        // the project materials, e.g. external link to a repo/info, prensentation slides, etc. It can also be documents, images, etc uploaded by the user
        // for now, only links are allowed. Images and others are later updates. Can store links to files here annd the file is stored on a server somewhere.
        // takes the form {material: "", type: ""}. type can be Hidden or Visible. Hidden materials are not shown in project page. Only the project ownner can see them
        type: Object,
        required: [true, 'Please add project material']
    }],
}, {
    timestamps: true
})

module.exports = mongoose.model('Projectmaterials', projectmaterialsSchema)