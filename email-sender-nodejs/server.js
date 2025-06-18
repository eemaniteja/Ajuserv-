// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000; // Use port from environment or default to 3000

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON request bodies

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services like 'Outlook365' or SMTP
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address (ajuservitsolutions@gmail.com)
        pass: process.env.EMAIL_PASS // Your App Password for Gmail
    }
});

// API endpoint to handle contact form submission
app.post('/send-email', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'All required fields must be filled.' });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: 'ajuservitsolutions@gmail.com', // Recipient address
        subject: `New Contact Form Submission: ${subject}`,
        html: `
            <h3>Contact Details</h3>
            <table border="1" style="border-collapse: collapse; width: 100%;">
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;"><b>Full Name:</b></td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;"><b>Email Address:</b></td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;"><b>Subject:</b></td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${subject}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd;"><b>Message:</b></td>
                    <td style="padding: 8px; border: 1px solid #ddd;"><pre style="white-space: pre-wrap; margin: 0;">${message}</pre></td>
                </tr>
            </table>
            <p>This email was sent from the contact form on your website.</p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ message: 'Error sending email', error: error.message });
        }
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Message sent successfully!' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});