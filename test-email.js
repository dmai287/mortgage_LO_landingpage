// test-email.js - Simple script to test email functionality
require('dotenv').config();
const nodemailer = require('nodemailer');

async function testEmail() {
  try {
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself for testing
      subject: 'Test: Blueprint Email System',
      html: `
        <h1>✅ Email System Working!</h1>
        <p>This is a test email to verify your blueprint email system is configured correctly.</p>
        <p>If you received this, your email credentials are working properly.</p>
      `,
      attachments: [
        {
          filename: 'test-attachment.txt',
          content: 'This is a test attachment to verify attachments work.'
        }
      ]
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', result.messageId);

  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check EMAIL_USER and EMAIL_APP_PASS in .env file');
    console.log('2. Make sure you\'re using an App Password (not regular password)');
    console.log('3. Enable 2FA on your Google account');
    console.log('4. Verify the app password is 16 characters');
  }
}

testEmail();