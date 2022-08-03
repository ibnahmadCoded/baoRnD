const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const VerificationToken = require('../models/verificationtokenModel')
const { generateVerificationCode, mailTransport, generateEmailTemplate, plainEmailTemplate } = require('../utils/mailtoken')
const { isValidObjectId } = require('mongoose')

// desc:  this function registers a user
// route: POST /api/users
// access Public
// dev:   Aliyu A.
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, type, password } = req.body
    
    // check that all fields are filled
    if(!name || !email || !password || !type) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // check if user exists
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    // hash the password using bcrypt
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // register user
    const user = await User.create({
        name,
        email,
        type,
        password: hashedPassword
    })

    if(user){
        const OTP = generateVerificationCode()
        const verificationtoken = new VerificationToken({
            user: user._id,
            token: OTP
        })

        await verificationtoken.save()

        mailTransport().sendMail({
            from: 'welcome@bd.com',
            to: user.email,
            subject: 'Verify Your Account',
            html: generateEmailTemplate(OTP),
        })

        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            type: user.type,
            token: generateToken(user._id)
        })
    }
    else 
    {
        res.status(400)
        throw new Error('Invalid data or token')
    }
    /*
    // check that user was created
    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            type: user.type,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid data')
    }
    */
})

// desc:  this function authenticates a user
// route: POST /api/users/login
// access Public
// dev:   Aliyu A.
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    
    // get the user email
    const user = await User.findOne({email})
    
    // get the password
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            type: user.type,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// desc:  this function updates the user's data. can be done only by logged in user
// route: PUT /api/users
// access Private
// dev:   Aliyu A.
const updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(400)
        throw new Error('User does not exist')
    }

    const { _id, name, email, type } = await User.findByIdAndUpdate(user._id, req.body, {
        new: true,
    })

    res.status(200).json({
        id: _id,
        name,
        email,
        type,
    })
})

// desc:  this function gets loggedin user's data. can be done only by logged in user
// route: GET /api/users/profile
// access Private
// dev:   Aliyu A.
const getMyProfile = asyncHandler(async (req, res) => {
    const { _id, name, email, type } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
        type,
    })
})

// desc:  this function gets a user's data
// route: GET /api/users/profile
// access Private
// dev:   Aliyu A.
const getProfile = asyncHandler(async (req, res) => {
    const { _id, name, email, type } = await User.findById(req.params.id)

    res.status(200).json({
        name,
        email,
        type,
    })
})


// desc: this function generates a JWT
const generateToken = (id) => {
    return  jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

// verify email
const verifyEmail = async(req, res) => {
    const {user, otpCode} = req.body
    if(!user || !otpCode.trim()){
        res.status(400)
        throw new Error('Invalid request')
    }

    if(!isValidObjectId(user)){
        res.status(400)
        throw new Error('Invalid user')
    }

    // fetch the user
    const u = await User.findById(user)
    if(!u){
        res.status(400)
        throw new Error('User not found')
    }

    if(u.verified){
        res.status(400)
        throw new Error('Account already verified')
    }

    const token = await VerificationToken.findOne({ user: u._id })
    if(!token){
        res.status(400)
        throw new Error('Sorry, user with token not found')
    }

    // compare the OTP with the one in the db
    const otpMatched = await token.compareToken(otpCode)
    if(!otpMatched){
        res.status(400)
        throw new Error('Sorry, token not found')
    }

    u.verified = true

    await VerificationToken.findByIdAndDelete(token._id)
    await u.save()

    mailTransport().sendMail({
        from: 'welcome@bd.com',
        to: u.email,
        subject: 'Account Verification Success',
        html: plainEmailTemplate(
            "Email Successfully Verified",
            "Thank you for joining baornd! You can access your account now."
        ),
    })
    
    res.status(200).json("Your account has been verified")
}

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    getMyProfile,
    updateProfile,
    verifyEmail,
}