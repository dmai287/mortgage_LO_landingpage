# Mortgage Landing Page - Email Integration Setup

This project now includes real email functionality for the First-Time Homebuyer Blueprint downloads.

## 🚀 Quick Setup

### 1. Install Backend Dependencies
```bash
npm install --package-lock-only package-server.json
```

### 2. Set Up Email Credentials
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your email credentials:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_APP_PASS=your-16-character-app-password
   ```

### 3. Get Gmail App Password (if using Gmail)
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Enable 2-Factor Authentication
3. Go to Security → App passwords
4. Generate an app password for "Mail"
5. Use this 16-character password in EMAIL_APP_PASS

### 4. Start the Servers

**Terminal 1 - Backend (Email Server):**
```bash
node server.js
```
Server will run on http://localhost:3001

**Terminal 2 - Frontend (React App):**
```bash
npm run dev
```
App will run on http://localhost:5173

## 📧 How It Works

1. User fills out name and email on the Blueprint page
2. Form submits to `/api/send-blueprint` endpoint
3. Backend sends email with PDF attachment using Nodemailer
4. User sees success message

## 🔧 Configuration Options

### Email Service
Currently configured for Gmail. To use other services:

```javascript
// In server.js, change the transporter config:
const transporter = nodemailer.createTransporter({
  service: 'outlook', // or 'yahoo', 'hotmail', etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // Regular password for non-Gmail
  }
});
```

### Custom SMTP
For complete control, use custom SMTP:

```javascript
const transporter = nodemailer.createTransporter({
  host: 'smtp.your-provider.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

## 📁 File Structure

```
mortgage-landing-page/
├── server.js                 # Email backend server
├── package-server.json       # Backend dependencies
├── .env.example             # Environment variables template
├── Laura_Bui_Homebuyer_Blueprint.pdf  # The PDF file to send
├── src/
│   └── mortgage_landing_page.tsx  # Updated with API calls
└── README.md                # This file
```

## 🐛 Troubleshooting

### "ECONNREFUSED" Error
- Make sure the backend server is running on port 3001
- Check that `server.js` is running without errors

### Email Not Sending
- Verify email credentials in `.env`
- Check Gmail app password (not regular password)
- Look at server console for error messages

### PDF Not Attaching
- Ensure `Laura_Bui_Homebuyer_Blueprint.pdf` exists in root directory
- Check file path in `server.js`

## 🚀 Production Deployment

For production, you'll need to:

1. **Deploy Backend**: Use services like Railway, Render, or Vercel
2. **Update API URL**: Change `http://localhost:3001` to your production URL
3. **Environment Variables**: Set EMAIL_USER and EMAIL_APP_PASS in production
4. **Domain**: Update CORS settings if needed

## 📞 Support

If you need help setting this up, check the server console for error messages and ensure all dependencies are installed.