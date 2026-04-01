# CivicWatch Environment Variables Export Script (PowerShell)
# This script exports all environment variables from .env to system

Write-Host "Setting up CivicWatch environment variables..." -ForegroundColor Green

# Backend Environment Variables
$env:MONGODB_URI = "mongodb+srv://vinodrathnam78:Zerodhaclone00@zerodhaclonecluster.2eswecw.mongodb.net/smartcity"
$env:JWT_SECRET = "ab32031422f4916bdfff8f74923b7f80f89257d5786822c9642bdbb85b1ae9bc385847a882e4840e29041da7f6aaa0405ebd4c5032688df1ff1596914e26e4a0"
$env:CLOUDINARY_CLOUD_NAME = "dxyp1g0l2"
$env:CLOUDINARY_API_KEY = "226581164349814"
$env:CLOUDINARY_API_SECRET = "your_actual_cloudinary_secret_here"
$env:GOOGLE_MAPS_API_KEY = "AIzaSyARRqi17fOiIckj1w-pCNDSagPyhmhgCsQ"

# Production flag
$env:NODE_ENV = "development"
$env:PORT = "3001"

Write-Host "Environment variables set successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Backend variables:" -ForegroundColor Yellow
Write-Host "  MONGODB_URI: $env:MONGODB_URI" -ForegroundColor Cyan
Write-Host "  JWT_SECRET: [HIDDEN]" -ForegroundColor Red
Write-Host "  CLOUDINARY_CLOUD_NAME: $env:CLOUDINARY_CLOUD_NAME" -ForegroundColor Cyan
Write-Host "  CLOUDINARY_API_KEY: $env:CLOUDINARY_API_KEY" -ForegroundColor Cyan
Write-Host "  GOOGLE_MAPS_API_KEY: $env:GOOGLE_MAPS_API_KEY" -ForegroundColor Cyan
Write-Host ""
Write-Host "To verify, run: `$env:VARIABLE_NAME`" -ForegroundColor Yellow
Write-Host ""
Write-Host "Setup complete! Variables are now available in this session." -ForegroundColor Green
