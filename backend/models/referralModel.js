const mongoose = require('mongoose')

const referralSchema = mongoose.Schema({
    user: {
        // The id of the refree (person who is referring another user)
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // acts as foreign key, i.e. linked to the userModel, which is exported as User. 
    },
    referrals: [{
        // emails and description of the people that were referred. Takes the form: {email: "", type: ""}
        // e.g. {email: "a@a.com", type: "Supervisor"}
        type: Object,
        required: [true, 'Please add details']
    }],
}, {
    timestamps: true
})

module.exports = mongoose.model('Referral', referralSchema)