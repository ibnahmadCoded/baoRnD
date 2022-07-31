const mongoose = require('mongoose')

const feedbackSchema = mongoose.Schema({
    feedback: {
        type: String,
        required: [true, 'Please add a feedback']
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Feedback', feedbackSchema)