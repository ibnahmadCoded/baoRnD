const { isValidObjectId } = require('mongoose')
const ResetpasswordToken = require('../models/resetpasswordtokenModel')
const User = require('../models/userModel')

const isResetTokenValid = async(req, res, next) => {
    const {token, id} = req.query
    
    if(!token || !id) {
        res.status(400)
        throw new Error('Invalid request!')
    }

    // is the user ID valid?
    if(!isValidObjectId(id)){
        res.status(400)
        throw new Error('User id does not exist!')
    }

    const u = await User.findById(id)

    if(!u){
        res.status(400)
        throw new Error('User does not exist!')
    }

    const resetToken = await ResetpasswordToken.findOne({user: u._id})
    if(!resetToken){
        res.status(400)
        throw new Error('Reset token does not exist!')
    }

    const isValidToken = await resetToken.compareToken(token)
    if(!isValidToken){
        res.status(400)
        throw new Error('Reset token is invalid!')
    }

    req.user = u
    next()
}

module.exports = {isResetTokenValid}