@echo off
echo 🚀 Starting Mortgage Landing Page Deployment to GitHub Pages
echo.

echo 📦 Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo 🔨 Building for production...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed
    pause
    exit /b 1
)

echo 📤 Deploying to GitHub Pages...
call npm run deploy
if %errorlevel% neq 0 (
    echo ❌ Deployment failed
    pause
    exit /b 1
)

echo ✅ Deployment successful!
echo.
echo 🌐 Your site will be available at:
echo    https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
echo.
echo 📝 Remember to:
echo    1. Create a public GitHub repository
echo    2. Push your code to the repository
echo    3. Enable GitHub Pages in repository settings
echo.
pause