const mongoose = require('mongoose')

const referralSchema = mongoose.Schema({
    user: {
        // The id of the refree (person who is referring another user)
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // acts as foreign key, i.e. linked to the userModel, which is exported as User. 
    },
    email: {
        type: String,
        required: [true, 'Please add the email you want to refer']
    },
    type: {
        // type of referral
        type: String,
        required: [true, 'Please add the type']
    },
    joined: {
        // has the referred person joined?
        type: Boolean,
        required: true,
        default: false
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Referral', referralSchema)