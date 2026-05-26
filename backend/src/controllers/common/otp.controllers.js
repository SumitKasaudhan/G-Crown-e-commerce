import nodemailer from "nodemailer";
import {ApiError} from "../../utils/api-error.js";
import {ApiResponse} from "../../utils/api-response.js";

const otp = async (req, res) => {
    try{
        const {email} = req.body;

        let OTP = parseInt(Math.random()*1000000).toString();

        const transport = nodemailer.createTransport({
            service: "gmail",
            auth:{
                 user:  process.env.Email,
                pass: process.env.Pass
            }
        });

        await transport.sendMail({
            from: `"G-Crown" <logine786@gmail.com>`,
            to: email,
            subject: "Your G-Crown Verification Code",
             html: `<div style="font-family: Arial, sans-serif;">
                    <h2 style="color: #0066cc;">G-Crown</h2>
                    <p>Your One-Time Password (OTP) for verifying your G-Crown account is:</p>
                    <h1 style="color: #333;">${OTP}</h1>
                    <p>This OTP will expire in <b>5 minutes</b>.</p>
                    <p>Do not share this code with anyone.</p>
                    <br />
                    <p>– The G-Crown Team</p>
                    </div>`,
        });

        return res.status(200).json(new ApiResponse(200,OTP, "Otp Send Successfully." ));
    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message, name: err.name}]))
    }
}

export default otp;