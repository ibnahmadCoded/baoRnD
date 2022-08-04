const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const VerificationToken = require('../models/verificationtokenModel')
const ResetpasswordToken = require('../models/resetpasswordtokenModel')
const Notification = require('../models/notificationModel')
const Referral = require('../models/referralModel')
const { generateVerificationCode, 
        mailTransport, 
        generateEmailTemplate, 
        plainEmailTemplate, 
        generatePasswordResetEmailTemplate, 
        generateRandomBytes } = require('../utils/mailtoken')
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

        // notify the user
        await Notification.create({
            user: user._id,
            item: user._id,
            type: "Signup",
            seen: false,
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

// desc:  this function registers a user through a referral link
// route: POST /api/users/referralsignup
// access Public
// dev:   Aliyu A.
const registerReferredUser = asyncHandler(async (req, res) => {
    const { name, email, type, password } = req.body
    const { id } = req.query

    if(!id){
        res.status(400)
        throw new Error('Referral link expired! Please use the normal sighnup instead')
    }
    
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

        // notify the user
        await Notification.create({
            user: user._id,
            item: user._id,
            type: "Signup",
            seen: false,
        })
        
        // update the referrals to show the user has created an account using the referral link
        const r = await Referral.findByIdAndUpdate(id, {joined: true}, {
            new: true,
        })

        // notify the user who referred the current user who just signed up
        await Notification.create({
            user: r.user,
            item: user._id,
            type: "ReferralSignup",
            seen: false,
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

// User forgot password?
const forgotPassword = async (req, res) => {
    const {email} = req.body
    if(!email){
        res.status(400)
        throw new Error('Please provide a valid email')
    }

    const user = await User.findOne({ email: email })
    if(!user){
        res.status(400)
        throw new Error('User not found')
    }

    const token = await ResetpasswordToken.findOne({user: user._id})
    // token expires after one hour
    if(token){
        res.status(400)
        throw new Error('Token exists already. You can request for another token after one hour!')
    }

    const t = await generateRandomBytes()
    const resetToken = new ResetpasswordToken({ user: user._id, token: t })
    await resetToken.save()

    mailTransport().sendMail({
        from: 'help@bd.com',
        to: user.email,
        subject: 'Reset Password',
        html: generatePasswordResetEmailTemplate(`http://localhost:3000/api/users/resetpassword?token=${t}&id=${user._id}`),   
        // change url later when in production. Using localhost cos frontend is using React server, from which the password would be reset.
    })

    res.status(200).json('Password reset link has been sent to your email')

}

const resetPassword = async(req, res) => {
    const { password } = req.body // sent in the request body

    const user = await User.findById(req.user._id) // user is set in the isResetTokenValid
    if(!user){
        res.status(400)
        throw new Error('User not found')
    }

    // is the user still using the old password?
    isSamePassword = await bcrypt.compare(password, user.password)

    //console.log(isSamePassword)
    if(isSamePassword){
        res.status(400)
        throw new Error('New password must be different from your previous password')
    }

    // save the password
    // hash the password using bcrypt
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    user.password = hashedPassword
    await user.save()

    await ResetpasswordToken.findOneAndDelete({user: user._id})

    mailTransport().sendMail({
        from: 'help@bd.com',
        to: user.email,
        subject: 'Password Reset Successfully',
        html: plainEmailTemplate(
            "Password successfully reset",
            "Now you can log in with your new password."
        ),
    })

    // notify the user
    await Notification.create({
        user: user._id,
        item: user._id,
        type: "PasswordReset",
        seen: false,
    })

    res.status(200).json("Password successfully reset")
}

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    getMyProfile,
    updateProfile,
    verifyEmail,
    forgotPassword,
    resetPassword,
    registerReferredUser,
}