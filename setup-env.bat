@echo off
REM CivicWatch Environment Variables Export Script
REM This script exports all environment variables from .env to system

echo Setting up CivicWatch environment variables...

REM Backend Environment Variables
set MONGODB_URI=mongodb+srv://vinodrathnam78:Zerodhaclone00@zerodhaclonecluster.2eswecw.mongodb.net/smartcity
set JWT_SECRET=ab32031422f4916bdfff8f74923b7f80f89257d5786822c9642bdbb85b1ae9bc385847a882e4840e29041da7f6aaa0405ebd4c5032688df1ff1596914e26e4a0
set CLOUDINARY_CLOUD_NAME=dxyp1g0l2
set CLOUDINARY_API_KEY=226581164349814
set CLOUDINARY_API_SECRET=your_actual_cloudinary_secret_here
set GOOGLE_MAPS_API_KEY=AIzaSyARRqi17fOiIckj1w-pCNDSagPyhmhgCsQ

REM Production flag
set NODE_ENV=development
set PORT=3001

echo Environment variables set successfully!
echo.
echo Backend variables:
echo   MONGODB_URI: %MONGODB_URI%
echo   JWT_SECRET: [HIDDEN]
echo   CLOUDINARY_CLOUD_NAME: %CLOUDINARY_CLOUD_NAME%
echo   CLOUDINARY_API_KEY: %CLOUDINARY_API_KEY%
echo   GOOGLE_MAPS_API_KEY: %GOOGLE_MAPS_API_KEY%
echo.
echo To verify, run: echo %VARIABLE_NAME%
echo.
pause
