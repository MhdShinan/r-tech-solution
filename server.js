const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); 

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.post('/send-email', async (req, res) => {
    const { firstName, contactNumber, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587, 
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: 'info@rtechsl.com', 
        to: process.env.EMAIL_USER,
        subject: `New Contact Form Submission from ${email}`,
        text: `
            You have a new message from your contact form:
            Name: ${firstName}
            Contact Number: ${contactNumber}
            Email: ${email}
            Message: ${message}
        `,
        replyTo: email, 
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email.' });
    }
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
