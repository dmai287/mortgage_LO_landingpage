const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Email configuration - Update these with your email credentials
const transporter = nodemailer.createTransporter({
  service: 'gmail', // or your email service (gmail, outlook, etc.)
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_APP_PASS // App password (not regular password)
  }
});

app.post('/api/send-blueprint', async (req, res) => {
  try {
    const { name, email } = req.body;

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your First-Time Homebuyer Blueprint from Laura Bui',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #142235; margin: 0;">Hi ${name}!</h1>
          </div>

          <div style="background: #f8f6f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-size: 16px; line-height: 1.6;">
              Thank you for your interest in the First-Time Homebuyer Blueprint from Laura Bui Home Loans.
            </p>
          </div>

          <p style="font-size: 16px; line-height: 1.6;">
            Attached is your comprehensive guide to buying your first home in the Bay Area. This 25-page blueprint covers everything you need to know about:
          </p>

          <ul style="font-size: 16px; line-height: 1.8;">
            <li>Step-by-step homebuying checklist</li>
            <li>Understanding your credit and pre-approval</li>
            <li>Budgeting for down payments and closing costs</li>
            <li>Timeline and key milestones</li>
            <li>Common first-time buyer mistakes to avoid</li>
            <li>Bay Area market insights and tips</li>
          </ul>

          <div style="background: #C8A96B; color: white; padding: 20px; border-radius: 8px; margin: 30px 0; text-align: center;">
            <p style="margin: 0; font-size: 18px; font-weight: bold;">
              Questions? Call Laura directly: +1 (669) 220 9164
            </p>
          </div>

          <p style="font-size: 16px; line-height: 1.6;">
            If you have any questions about the blueprint or need help with your home buying journey, feel free to reply to this email or call Laura directly.
          </p>

          <p style="font-size: 16px; line-height: 1.6;">
            Best regards,<br>
            <strong>Laura Bui</strong><br>
            Personal Loan Officer<br>
            Laura Bui Home Loans<br>
            +1 (669) 220 9164
          </p>
        </div>
      `,
      attachments: [
        {
          filename: 'Laura_Bui_Homebuyer_Blueprint.pdf',
          path: path.join(__dirname, 'public', 'Laura_Bui_Homebuyer_Blueprint.pdf')
        }
      ]
    };

    await transporter.sendMail(mailOptions);

    console.log(`Blueprint sent successfully to ${email}`);
    res.json({ success: true, message: 'Blueprint sent successfully!' });

  } catch (error) {
    console.error('Email sending failed:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send blueprint. Please try again or contact us directly.'
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Blueprint email server running on port ${PORT}`);
  console.log('Make sure to set EMAIL_USER and EMAIL_APP_PASS environment variables');
});