const mongoose = require('mongoose')

const newslettersignupSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add an email']
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Newsletteremails', newslettersignupSchema)