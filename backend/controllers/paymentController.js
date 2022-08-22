const asyncHandler = require('express-async-handler')
const Stripe = require("stripe")(process.env.STRIPE_SECRET)

//const Category = require('../models/categoryModel')
const User = require('../models/userModel')
const Metric = require('../models/metricModel')
const Payment = require("../models/paymentModel")
const { mailTransport, plainEmailTemplate } = require('../utils/mailtoken')

// desc:    Get all categories for a user.  
// route:   GET /api/categories
// access:  Private 
// dev:     Aliyu A.   
const makePayment = asyncHandler(async (req, res) => {

    const { amount, id, type, project } = req.body

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(400)
        throw new Error('User cannot be found')
    }

    try {
        const payment = await Stripe.paymentIntents.create({
            amount: amount,
            currency: "USD",
            description: type,
            payment_method: id,
            confirm: true
        })

        if(payment){
            
            // send referral email to the user 
            mailTransport().sendMail({
                from: 'payments@baornd.com',
                to: user.email,
                subject: 'Payment Receipt',
                html: plainEmailTemplate(
                    "Your Payment Receipt",
                    `Thank you for making a payment of $${amount/100}. Please take this email as your payment receipt. Thank you`
                ),
            })

            // duplicate payment in own DB,
            await Payment.create({
                user: req.user.id,
                project: project,
                type: type,
                amount: amount,
                stripeId: id.toString(),
            })

            // update metric
            const m = await Metric.findOne()
            
            await Metric.findByIdAndUpdate(m._id, {$set: {
                "payments": m.payments + 1,
                "paymentamount": m.paymentamount + (amount/100), }}, {
                new: true,
            })
            
        }

        res.status(200).json(payment)
    } catch (error) {
        console.log("Error", error)
        res.json({
            message: "Payment unsuccessful",
            success: false
        })
    }
})

module.exports = {
    makePayment,
}