@echo off
echo 🚀 GitHub Repository Setup for Mortgage Landing Page
echo.

set /p REPO_NAME=Enter your GitHub repository name (e.g., mortgage):
set /p GITHUB_USER=Enter your GitHub username:

echo.
echo 📝 Repository URL will be: https://github.com/%GITHUB_USER%/%REPO_NAME%
echo.

echo 🔧 Initializing Git repository...
git init
git add .
git commit -m "Initial commit: Mortgage landing page with PDF preview and lead capture"

echo.
echo 🔗 Connecting to GitHub repository...
git remote add origin https://github.com/%GITHUB_USER%/%REPO_NAME%.git
git branch -M main
git push -u origin main

if %errorlevel% neq 0 (
    echo ❌ Failed to push to GitHub
    echo.
    echo 💡 Make sure:
    echo    - Repository exists on GitHub
    echo    - Repository is public
    echo    - You have push access
    echo.
    pause
    exit /b 1
)

echo ✅ Code pushed to GitHub successfully!
echo.
echo 🌐 Next steps:
echo    1. Go to https://github.com/%GITHUB_USER%/%REPO_NAME%
echo    2. Go to Settings → Pages
echo    3. Select "GitHub Actions" as source
echo    4. Wait 2-3 minutes for deployment
echo    5. Your site will be at: https://%GITHUB_USER%.github.io/%REPO_NAME%/
echo.
pause