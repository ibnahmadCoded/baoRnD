const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async(req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // get the token from the header
            token = req.headers.authorization.split(' ')[1]

            // verify the token
            const decoded_token  = jwt.verify(token, process.env.JWT_SECRET)

            // get user from the token
            req.user = await (await User.findById(decoded_token.id))

            // an unverified user cannot access a protected route
            if(!req.user.verified){
                res.status(400)
                throw new Error('User is unverified')
            }

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token found')
    }
})

module.exports = { protect }