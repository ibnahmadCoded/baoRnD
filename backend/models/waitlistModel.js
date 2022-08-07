const mongoose = require('mongoose')

const waitlistSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add an email']
    },
    signedup: {
        type: Boolean,
        required: true,
        default: false,
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Waitlist', waitlistSchema)