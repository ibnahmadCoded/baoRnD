const nodemailer = require('nodemailer')
const crypto = require('crypto')
const { isValidObjectId } = require('mongoose')
const User = require('../models/userModel')
const ResetpasswordToken = require('../models/resetpasswordtokenModel')

let verificationCode = ''
// desc: this function generates an OTP verification code to be sent to user
// note: change to a more secure function or package later
const generateVerificationCode = () => {

    for(let i = 0; i <= 3; i++){
        const randomValue = Math.round(Math.random() * 9)
        verificationCode = verificationCode + randomValue
    }

    return verificationCode
}

// change values to the hosting service or email hosting service in production
const mailTransport = () =>  nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.MAILTRAP_USERNAME,
          pass: process.env.MAILTRAP_PASSWORD
        }
      });

// email template for OTP email verification
const generateEmailTemplate = verificationcode => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE-edge">
        <style>
        @media only screen and (max-width: 620px){
            h1{
                font-size: 20px;
                padding: 5px;
            }
        }
        </style>
    </head>
    <body>
    <div>
        <div style="max-width: 620px; margin: 0 auto; font-family: sans-serif; color: #272727;">
            <h1 style="background: #f6f6f6; padding: 10px; text-align: center; color: #272727;">We are delighted to welcome you to baornd!</h1>
            <p>Please verify your account to continue. Your verification code is: </p>
            <p style="width: 80px; margin: 0 auto; font-weight: bold; text-align: center; background: #f6f6f6; border-radius: 5px; font-size: 25px;">
            ${verificationcode}</p>
        </div>
    </div>
    </body>
    </html>
    `
}

// email template for OTP email verification
const plainEmailTemplate = (heading, message) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE-edge">
        <style>
        @media only screen and (max-width: 620px){
            h1{
                font-size: 20px;
                padding: 5px;
            }
        }
        </style>
    </head>
    <body>
    <div>
        <div style="max-width: 620px; margin: 0 auto; font-family: sans-serif; color: #272727;">
            <h1 style="background: #f6f6f6; padding: 10px; text-align: center; color: #272727;">${heading}</h1>
            <p>${message}</p>
        </div>
    </div>
    </body>
    </html>
    `
}

// email template for Password reset email
const generatePasswordResetEmailTemplate = url => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE-edge">
        <style>
        @media only screen and (max-width: 620px){
            h1{
                font-size: 20px;
                padding: 5px;
            }
        }
        </style>
    </head>
    <body>
    <div>
        <div style="max-width: 620px; margin: 0 auto; font-family: sans-serif; color: #272727;">
            <h1 style="background: #f6f6f6; padding: 10px; text-align: center; color: #272727;">Your Password Reset URL is ready!</h1>
            <p>Please click the link below to reset your password </p>
            <div style="text-align: center;">
                <a href="${url}" style="font-family: sans-serif; margin: 0 auto; padding: 20px; text-align: center; 
                background: #e63946; border-radius: 5px; font-size: 20px 10px; color: #fff; cursor: pointer; text-decoration: none; display: inline-block;"> 
                Reset Password</a>
            </div>
        </div>
    </div>
    </body>
    </html>
    `
}

const generateRandomBytes = () => 
    new Promise((resolve, reject) => {
        crypto.randomBytes(30, (err, buff) => {
            if(err) reject(err)

            const token = buff.toString('hex')
            resolve(token)
        })
    })

// email template for Password reset email
const generateReferralEmailTemplate = (type, url) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE-edge">
        <style>
        @media only screen and (max-width: 620px){
            h1{
                font-size: 20px;
                padding: 5px;
            }
        }
        </style>
    </head>
    <body>
    <div>
        <div style="max-width: 620px; margin: 0 auto; font-family: sans-serif; color: #272727;">
            <h1 style="background: #f6f6f6; padding: 10px; text-align: center; color: #272727;">A user on baoRnD referred you to join the platform as ${type}!</h1>
            <p>Please click the link below to create an account </p>
            <div style="text-align: center;">
                <a href="${url}" style="font-family: sans-serif; margin: 0 auto; padding: 20px; text-align: center; 
                background: #e63946; border-radius: 5px; font-size: 20px 10px; color: #fff; cursor: pointer; text-decoration: none; display: inline-block;"> 
                Signup</a>
            </div>
        </div>
    </div>
    </body>
    </html>
    `
}

// email template for Password reset email
const generateWaitlistEmailTemplate = (url) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE-edge">
        <style>
        @media only screen and (max-width: 620px){
            h1{
                font-size: 20px;
                padding: 5px;
            }
        }
        </style>
    </head>
    <body>
    <div>
        <div style="max-width: 620px; margin: 0 auto; font-family: sans-serif; color: #272727;">
            <h1 style="background: #f6f6f6; padding: 10px; text-align: center; color: #272727;">Thank you for joining the baoRnD Waitlist. Your signup link is ready!</h1>
            <p>Please click the link below to create an account </p>
            <div style="text-align: center;">
                <a href="${url}" style="font-family: sans-serif; margin: 0 auto; padding: 20px; text-align: center; 
                background: #e63946; border-radius: 5px; font-size: 20px 10px; color: #fff; cursor: pointer; text-decoration: none; display: inline-block;"> 
                Signup</a>
            </div>
        </div>
    </div>
    </body>
    </html>
    `
}

module.exports = {
    generateVerificationCode,
    mailTransport,
    generateEmailTemplate,
    plainEmailTemplate,
    generatePasswordResetEmailTemplate,
    generateRandomBytes,
    generateReferralEmailTemplate,
    generateWaitlistEmailTemplate
}