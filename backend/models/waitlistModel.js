const mongoose = require('mongoose')

const waitlistSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add an email']
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Waitlist', waitlistSchema)