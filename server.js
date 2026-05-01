const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
// app.use(cors());
app.use(cors({
  origin: '*' 
}));
app.use(express.json());

app.post('/send-email', async (req, res) => {
    const { name, email, mobile, subject, message } = req.body;

    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            // auth: {
            //     user: 'kranthit.1997@gmail.com',
            //     pass: 'xyjjorfccizyqxpx'
            // },
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        let mailOptions = {
            from: email,
            to: 'kranthit.1997@gmail.com',
            subject: subject || 'New Contact Inquiry',
            html: `
        <h3>New Inquiry</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mobile:</b> ${mobile}</p>
        <p><b>Message:</b> ${message}</p>
      `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error sending email' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));