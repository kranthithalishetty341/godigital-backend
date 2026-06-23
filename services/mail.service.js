const axios = require('axios');

const sendEmail = async ({name, email, mobile, subject, message}) =>{
    const response = await axios.post(
        'https://api.brevo.com/v3/smtp/email',
        {
            sender:{
                email: process.env.SENDER_EMAIL,
                name: "website Contact"
            },
            to: [{
                email: process.env.TO_EMAIL
            }
        ],
        subject: `New Contact Message - ${name}`,
        htmlContent: `
        <h2>New Contact Form Message</h2>
        <p><b>Name:</b>${name}</p>
        <p><b>Email:</b>${email}</p> 
        <p><b>Mobile:</b>${mobile}</p> 
        <p><b>Subject:</b>${subject}</p> 
        <p><b>Message:</b>${message}</p>
        `
        },
        {
            headers:{
                'api-key': process.env.BREVO_API_KEY,
                'Content-Type':'application/json'
            }
        }
    );
    return response.data;
};

module.exports = { sendEmail };