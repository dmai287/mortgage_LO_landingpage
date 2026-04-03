# 🚀 One-Click Deployment Guide

## ⚡ Quick Deploy (Recommended)

### Step 1: Run Setup Script
Double-click `setup-github.bat` and follow the prompts:
- Enter your GitHub repository name
- Enter your GitHub username
- Script handles everything automatically

### Step 2: Enable GitHub Pages
1. Go to your GitHub repository
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Select **"GitHub Actions"** as source
5. Wait 2-3 minutes

### Step 3: Your Site is Live!
Access at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

---

## 🔧 Manual Deployment

If you prefer manual control:

### Step 1: Create GitHub Repository
1. Go to [github.com](https://github.com)
2. Create new **public** repository
3. Name it (e.g., `mortgage-landing-page`)

### Step 2: Push Code to GitHub
```bash
# Run the setup script or manually:
git init
git add .
git commit -m "Deploy mortgage landing page"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 3: Build & Deploy
Double-click `deploy.bat` or run:
```bash
npm install
npm run build
npm run deploy
```

### Step 4: Enable GitHub Pages
- Repository Settings → Pages
- Source: **GitHub Actions**
- Wait for deployment

---

## 📋 What Gets Deployed

✅ **Complete mortgage landing page**
- Responsive design for all devices
- PDF preview with lead capture
- Loan options with floating comparison table
- Professional styling and animations

✅ **All assets included**
- Images for loan options and quick tips
- Blueprint PDF for download
- Optimized for fast loading

✅ **Automatic deployment**
- Every push to main branch auto-deploys
- No manual intervention needed

---

## 🎯 Features Ready for Production

- **Lead Capture**: PDF preview → form → download
- **Mobile Optimized**: Works perfectly on phones
- **Fast Loading**: Optimized images and code
- **SEO Ready**: Proper meta tags and structure
- **Analytics Ready**: Can add Google Analytics easily

---

## 🔍 Troubleshooting

### Build Fails
```bash
# Check for errors
npm run build
```

### 404 Errors
- Check repository name matches `vite.config.ts` base path
- Ensure GitHub Pages is enabled

### Images Not Loading
- Verify all images are in `public/` folder
- Check browser console for errors

---

## 🎉 Success Checklist

- [ ] Repository created on GitHub
- [ ] Code pushed successfully
- [ ] GitHub Pages enabled
- [ ] Site loads at your GitHub URL
- [ ] PDF preview works
- [ ] Contact form functional
- [ ] Mobile responsive

**Your mortgage landing page is now live and ready to capture leads!** 🚀