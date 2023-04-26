const express = require('express');
const app = express()
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../Db/user');
const bcrypt = require('bcrypt')


const nodemailer = require('nodemailer');
// const randomstring = require('randomstring');
// const { response } = require('express');

const sendMail = 'amitrecb@gmail.com'
const sendPassword = 'gvfmprhiopbqgbxg'

const generateOtp = () =>{
    return (Math.floor(Math.random() * (9999 - 1000)) + 1000) + ''
}

const sendResetPasswordMail = async (name, email, otp) => {

    try {
        
        const transporter =  nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure:false,
            requireTLS:true,
            auth:{
                user:sendMail,
                pass:sendPassword
            }
        })

        const mailOptions = {
            from: sendMail,
            to: email,
            subject: "OTP Verification",
            html:`Hi ${name}, <br /> <br /> 
                Your OTP for Verification is <b>${otp}</b>. Valid only for 10 minutes.
                
                <br /> <br />
                <p>Don't share this OTP with anyone.</p>

                <br/>
                Thank you.`,
        }

        transporter.sendMail(mailOptions,(err,info) => {
            if(err){
                console.log(err);
            }
            else{
                console.log("mail sent successfully",info)
            }
        })

    } catch (error) {
        res.status(400).send({success:false, message:error.message})
        console.log(error)
    }
}


router.post('/forgot',async(req, res) => {
    try {
        const email = req.body.email;
        const userData = await User.findOne({email: email})
        
        if(userData){
            const OTP = generateOtp()
            console.log(typeof OTP)
            await User.updateOne({email: email}, {
                $set:{otp: OTP}
            })
            sendResetPasswordMail(userData.name, userData.email, OTP)

            res.status(200).send({success: true, msg: "Please Check our inbox mail for OTP and reset your password"})
        }
        else{
            res.status(200).send({success: false, msg:"This email does not exist"})
        }
    } catch (error) {
        res.status(400).send({error: error})
        // console.log(error)
    }
})


router.post('/reset-password', async(req, res, next) => {
    const email = req.body.email
    const userData = await User.findOne({email: email})
    if(userData){
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
              // console.log(err);
              return res.status(500).json({
                error: err,
              });
            } else {
        await User.updateOne({email: email}, {
            $set:{password: hash}
        })
        return res.status(200).json({success: true,msg: "Password updated successfully"})
    }
    })
    }
})

router.post('/validateotp',async(req, res) => {
    const otp = req.body.otp
    // console.log(typeof otp)
    const email = req.body.email
    // console.log(email)
    const userData = await User.findOne({email: email})
    console.log(userData.otp === otp)
    if(userData){
        if(userData.otp === otp){
            await User.updateOne({email: email}, {
                $set:{otp: ''}
            })
            res.status(200).send({success: true, msg: "OTP is valid"})
        }
        else{
            res.status(200).send({success: false, msg: "OTP is invalid"})
        }
    }
    else{
        res.status(200).send({error: true, msg: "This email does not exist"})
    }
})

module.exports = router