# 🚀 GitHub Pages Deployment Guide

## Prerequisites
- GitHub account
- Git installed locally
- Node.js installed locally

## Step 1: Create GitHub Repository
1. Go to [github.com](https://github.com)
2. Create new **public** repository
3. Name it (e.g., `mortgage-landing-page`)
4. **Important**: Repository must be public (GitHub Pages requires public repos)

## Step 2: Push Your Code to GitHub
```bash
# Run the setup script or manually:
git init
git add .
git commit -m "Deploy mortgage landing page"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Under **Source**, select **"GitHub Actions"**
5. The workflow will automatically deploy your site

## Step 4: Access Your Site
After deployment (usually 2-3 minutes), your site will be available at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

## Manual Deployment (Alternative)
If you prefer manual deployment instead of GitHub Actions:

```bash
# Install gh-pages package
npm install --save-dev gh-pages

# Deploy manually
npm run deploy
```

## Troubleshooting

### Build Fails
- Check that all dependencies are installed: `npm install`
- Ensure TypeScript compiles: `npm run build`

### 404 Errors
- Check repository name matches `vite.config.ts` base path
- Verify GitHub Pages is enabled

### Images Not Loading
- Verify all images are in `public/` folder
- Check browser console for errors

## Customization

### Change Repository Name
If your repo name is different from "mortgage", update `vite.config.ts`:
```typescript
base: process.env.NODE_ENV === 'production' ? '/YOUR_REPO_NAME/' : '/',
```

### Custom Domain
To use a custom domain:
1. Go to repository Settings → Pages
2. Add your custom domain
3. Configure DNS records as instructed

## Need Help?
- Check GitHub Actions tab for deployment logs
- Verify all files are committed and pushed
- Ensure repository is public

Your mortgage landing page will be live and accessible worldwide! 🌐