const express = require('express');
const router = express.Router();
const { sendEmail } = require('../services/mail.service');

router.post('/send-email', async (req, res)=>{
    try{
        const { name, email, message } = req.body;

        if(!name || !email || !message){
            return res.status(400).json({
                success:false,
                message: "All fields are required"
            });
        }

        if(!email.include('@')){
            return res.status(400).json({
                success: false,
                message: "Invalid email address"
            });
        }

        await sendEmail({name, email, message});

        res.json({
            success: true,
            message: "Message sent successfully"
        });
    } catch(err){
        console.error("Brevo Error:", err.response?.data || res.message);
        res.status(500).json({
            success:false,
            message: "Failed to send message"
        });
    }
});

module.exports = router;