const nodemailer = require('nodemailer')

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

module.exports = {
    generateVerificationCode,
    mailTransport,
    generateEmailTemplate,
    plainEmailTemplate
}