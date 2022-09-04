const mongoose = require('mongoose')

const subscribeSchema = mongoose.Schema({
    price: {
        type: Number,
        required: [true, 'Please set the price']
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Subscription', subscribeSchema)