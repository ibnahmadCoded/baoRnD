const asyncHandler = require('express-async-handler')

const Referral = require('../models/referralModel')
const User = require('../models/userModel')
const { mailTransport, generateReferralEmailTemplate } = require('../utils/mailtoken')

// desc:    Get all referrals of a user.  
// route:   GET /api/referrals
// access:  Private 
// dev:     Aliyu A.   
const getReferrals = asyncHandler(async (req, res) => {
    const referrals = await Referral.find({ user: req.user.id })

    res.status(200).json(referrals)
    
})

// desc:    Add referral of a user.  
// route:   POST /api/referrals
// access:  Private 
// dev:     Aliyu A.   
const addReferral = asyncHandler(async (req, res) => {
    if(!req.body.email){
        res.status(400)
        throw new Error('Please provide an email')
    }

    if(!req.body.type){
        res.status(400)
        throw new Error('Please provide a referral type')
    }

    // you cannot refer a registered user
    // check if user exists
    const userExists = await User.findOne({email: req.body.email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    // get referral of user to check if user already exists. We dont want to duplicate users in this collection
    const r = await Referral.findOne({ user: req.user.id, email: req.body.email })

    if(r){
        // send referral email to the user again
        mailTransport().sendMail({
            from: 'referrals@bd.com',
            to: req.body.email,
            subject: 'baoRnD Referral',
            html: generateReferralEmailTemplate(req.body.type, 
                `http://localhost:3000/api/users/referralsignup?id=${r._id}`)
        })

        res.status(200).json("You already referred this user. A referral link has been resent to the email")
    }
    else
    {
        // else we create a new referral entry for the user, in the collection
        const referral = await Referral.create({
            user: req.user.id,
            email: req.body.email,
            type: req.body.type,
            joined: false
        })

        // send referral email to the user
        mailTransport().sendMail({
            from: 'referrals@bd.com',
            to: req.body.email,
            subject: 'baoRnD Referral',
            html: generateReferralEmailTemplate(req.body.type, 
                `http://localhost:3000/api/users/referralsignup?id=${referral._id}`)
        })

        res.status(200).json(`Thank you! A referral link has been sent to ${referral.email}`)
    }

    /*
    if (r){
        // if the user already exists with referrals in the collection, just update it with the additional referrals
        const referral = await Referral.findByIdAndUpdate(r._id, {$addToSet: {referrals: req.body.detail}}, {
            new: true,
        })

        console.log(req.body.detail)
        // send referral email to the user
        mailTransport().sendMail({
            from: 'referrals@bd.com',
            to: req.body.detail.email,
            subject: 'baoRnD Referral',
            html: generateReferralEmailTemplate(req.body.detail.type, 
                `http://localhost:3000/users/referralsignup?t=${req.body.detail.type}em=${req.body.detail.email}&id=${referral._id}`)
        })

        res.status(200).json(referral)
    }
    else
    {
        // else we create a new referral entry for the user, in the collection
        const referral = await Referral.create({
            user: req.user.id,
            referrals: req.body.detail
        })

        console.log(req.body.detail)
        // send referral email to the user
        mailTransport().sendMail({
            from: 'referrals@bd.com',
            to: req.body.detail.email,
            subject: 'baoRnD Referral',
            html: generateReferralEmailTemplate(req.body.detail.type, 
                `http://localhost:3000/users/referralsignup?t=${req.body.detail.type}em=${req.body.detail.email}&id=${referral._id}`)
        })

        res.status(200).json(referral)
    }
    */
    
})

// desc:    Remove referral for a user.  
// route:   DELETE /api/referrals
// access:  Private 
// dev:     Aliyu A.   
const removeReferral = asyncHandler(async (req, res) => {
    const referral = await Referral.findById(req.params.id)

    if(!referral){
        res.status(400)
        throw new Error('Referral does not exist')
    }

    await referral.remove()

    res.status(200).json({ id: req.params.id })

    /*
    if(!req.body.detail){
        res.status(400)
        throw new Error('Please provide the detail')
    }
    
    // get referral of user to check if user already exists. We dont want to duplicate users in this collection
    const r = await Referral.findOne({ user: req.user.id })

    if (r && r.referrals.includes(req.body.detail)){
        // if the user already exists with the referral to be removed in it, remove the item from the array of referrals for the project
        const referral = await Referral.findByIdAndUpdate(r._id, {$pull: {referrals: req.body.detail}}, {
            new: true,
        })

        // remove data entirely if there is no milestones left for user&project
        if (referral.referrals.length === 0){
            await referral.remove()

            res.status(200).json("All your referrals have been removed.")
        }
        else{
            res.status(200).json(`The ${req.body.detail} referral removed. Current referrals: ${referral.referrals}`)
        }
    }
    else
    {
        res.status(400)
        throw new Error('User or referral does not exist')
    }
*/

})

module.exports = {
    addReferral,
    removeReferral,
    getReferrals,
}