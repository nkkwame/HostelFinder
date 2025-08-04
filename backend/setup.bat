@echo off
echo ====================================
echo    UCC HostelFinder Database Setup
echo ====================================
echo.

echo 1. Make sure you have completed MongoDB Atlas setup
echo    (See MONGODB_SETUP.md for detailed instructions)
echo.

echo 2. Create your .env file with MongoDB connection string
echo    (Copy from .env.template and update with your credentials)
echo.

set /p proceed="Have you completed steps 1-2? (y/n): "
if /i "%proceed%" neq "y" (
    echo Please complete the setup steps first.
    echo See MONGODB_SETUP.md for detailed instructions.
    pause
    exit /b 1
)

echo.
echo Installing dependencies...
call npm install

echo.
echo Seeding database with UCC hostel data...
call node seed.js

echo.
echo Starting backend server...
call npm start
