const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const verificationtokenSchema = mongoose.Schema({
    user: {
        // the user linked with the token
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please add a user']
    },
    token: {
        type: String,
        required: [true, 'Please add a token'],
    },
    createdAt: {
        type: Date,
        expires: 3600,
        default: Date.now()
    }
})

verificationtokenSchema.pre("save", async function (next) {
    if(this.isModified("token")){
        const hash = await bcrypt.hash(this.token, 8)
        this.token = hash
    }

    next()
})

verificationtokenSchema.methods.compareToken = async function (token) {
    const result = await bcrypt.compareSync(token, this.token)
    return result
}

module.exports = mongoose.model('Verificationtoken', verificationtokenSchema)