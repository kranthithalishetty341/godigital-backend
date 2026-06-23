const express = require('express');
const router = express.Router();
const { sendEmail } = require('../services/mail.service');

router.post('/send-email', async (req, res) => {
    try {
        const { name, email, mobile, subject, message } = req.body;

        if (!name || !email || !mobile || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (!email.includes('@')) {
            return res.status(400).json({
                success: false,
                message: "Invalid email address"
            });
        }

        console.log("BREVO_API_KEY:", process.env.BREVO_API_KEY ? "FOUND" : "MISSING");
        console.log("SENDER_EMAIL:", process.env.SENDER_EMAIL);
        console.log("TO_EMAIL:", process.env.TO_EMAIL);

        await sendEmail({ name, email, mobile, subject, message });

        res.json({
            success: true,
            message: "Message sent successfully"
        });
    } catch (err) {
        console.error("Brevo Error:", err.response?.data || err.message);
        res.status(500).json({
            success: false,
            message: "Failed to send message"
        });
    }
});

module.exports = router;