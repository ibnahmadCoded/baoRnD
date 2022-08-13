const mongoose = require('mongoose')

const waitlistSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add an email']
    },
    signedup: {
        // is signup email sent?
        // this is done by getting the email, adding it to the referral collection and sending them signup email
        type: Boolean,
        required: true,
        default: false,
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Waitlist', waitlistSchema)