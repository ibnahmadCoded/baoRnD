const mongoose = require('mongoose')

const paymentSchema = mongoose.Schema({
    user: {
        // The id of the user
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // acts as foreign key, i.e. linked to the userModel, which is exported as User. 
    },
    project: {
        // The id of the project related to the payment. Can be blank, e.g. in the case of subsciption payment
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project' // acts as foreign key, i.e. linked to the userModel, which is exported as User. 
    },
    type: {
        // the type of payment. The types currently supported are: Investment (for project investments), ReqestedPayment (when a user requests for payment from someone and
        // the person paid). Subsciption (for when it goes online). Encryption (for when it goes online)
        type: String,
        required: [true, 'Please set the payment type']
    },
    amount: {
        // amount paid (in cents, like Stripe)
        type: Number,
        required: [true, 'Please set the amount paid']
    },
    stripeId: {
        // id used for the stripe payment
        type: String,
        required: [true, 'Please stripeId']
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Payment', paymentSchema)