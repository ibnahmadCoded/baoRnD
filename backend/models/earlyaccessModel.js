const mongoose = require('mongoose')

const earlyaccessSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add an email']
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Earlyaccess', earlyaccessSchema)