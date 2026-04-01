# CivicWatch Deployment Guide

## 🚀 Deployment Options

### Option 1: Full Stack Deployment (Recommended for Production)

#### Backend Deployment (Node.js + MongoDB)

**1. Prepare Backend for Production**

```bash
# Navigate to backend directory
cd backend

# Install production dependencies
npm install --production

# Set production environment variables
# Create .env.production file with:
NODE_ENV=production
PORT=3001
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_secure_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

**2. MongoDB Setup**

```bash
# Option A: MongoDB Atlas (Cloud)
# 1. Create account at https://www.mongodb.com/atlas
# 2. Create a free cluster
# 3. Get connection string and update MONGODB_URI

# Option B: Self-hosted MongoDB
# Install MongoDB on your server
sudo apt-get install mongodb
# Start MongoDB service
sudo systemctl start mongod
sudo systemctl enable mongod
```

**3. Deploy Backend Services**

```bash
# Option A: Using PM2 (Process Manager)
npm install -g pm2

# Start backend with PM2
pm2 start server.js --name "civicwatch-backend"

# Save PM2 configuration
pm2 save
pm2 startup

# Option B: Using Docker
# Create Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3001
CMD ["node", "server.js"]

# Build and run
docker build -t civicwatch-backend .
docker run -p 3001:3001 civicwatch-backend
```

#### Frontend Deployment (React)

**1. Build for Production**

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create production build
npm run build

# This creates a 'build' folder with optimized files
```

**2. Deploy Frontend**

```bash
# Option A: Serve with Nginx (Recommended)
sudo apt-get install nginx

# Copy build files to Nginx
sudo cp -r build/* /var/www/html/

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/civicwatch
```

**Nginx Configuration File:**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend static files
    location / {
        root /var/www/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    # Backend API proxy
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/civicwatch /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

**Option B: Deploy to Vercel/Netlify**
```bash
# For Vercel
npm install -g vercel
cd frontend
vercel --prod

# For Netlify
# Upload build folder to Netlify dashboard
```

### Option 2: Platform-as-a-Service (PaaS)

#### Heroku Deployment

**1. Backend on Heroku**
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create Heroku app
heroku create civicwatch-backend

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set GOOGLE_MAPS_API_KEY=your_maps_api_key

# Deploy backend
git subtree push --prefix backend heroku main
```

**2. Frontend on Vercel/Netlify**
```bash
# Build frontend
cd frontend
npm run build

# Deploy to Vercel
vercel --prod

# Or Netlify (drag and drop build folder)
```

#### Render.com Deployment

**1. Backend on Render**
- Go to render.com
- Create "Web Service"
- Connect GitHub repository
- Set root path: `backend`
- Set environment variables
- Deploy automatically

**2. Frontend on Render**
- Create "Static Site"
- Set root path: `frontend/build`
- Connect to backend service

### Option 3: Cloud Deployment (AWS/GCP/Azure)

#### AWS Deployment

**1. Backend on AWS EC2**
```bash
# Launch EC2 instance (Ubuntu 20.04)
# SSH into instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Setup Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and setup backend
git clone your-repo
cd backend
npm install --production
npm install -g pm2

# Setup MongoDB Atlas
# Update .env with production values

# Start with PM2
pm2 start server.js --name civicwatch-backend
```

**2. Frontend on AWS S3 + CloudFront**
```bash
# Build frontend
cd frontend
npm run build

# Install AWS CLI
aws configure

# Create S3 bucket
aws s3 mb s3://your-bucket-name

# Sync build files to S3
aws s3 sync build/ s3://your-bucket-name --delete

# Configure static website hosting
aws s3 website s3://your-bucket-name --index-document index.html

# Set up CloudFront CDN
aws cloudfront create-distribution --distribution-config file://config.json
```

## 🔧 Environment Configuration

### Production Environment Variables

**Backend (.env.production):**
```env
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/civicwatch
JWT_SECRET=your_super_secure_jwt_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Frontend Environment Variables

**Create .env.production in frontend:**
```env
REACT_APP_API_URL=https://your-domain.com/api
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## 🛡️ Security Considerations

### 1. Backend Security
```bash
# Enable HTTPS with Let's Encrypt
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com

# Setup firewall
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable

# Rate limiting
npm install express-rate-limit
```

### 2. Database Security
```bash
# Use MongoDB Atlas with IP whitelisting
# Enable authentication
# Use SSL/TLS connections
```

### 3. Environment Security
```bash
# Never commit .env files
# Use environment-specific configs
# Rotate secrets regularly
```

## 📊 Monitoring and Maintenance

### 1. Application Monitoring
```bash
# PM2 Monitoring
pm2 monit

# Add logging
npm install winston
```

### 2. Database Monitoring
```bash
# MongoDB Atlas monitoring
# Set up alerts for performance
```

### 3. Backup Strategy
```bash
# MongoDB backups
# Code repository backups
# Environment variable backups
```

## 🚀 Quick Deployment Script

```bash
#!/bin/bash
# deploy.sh

echo "Starting CivicWatch Deployment..."

# Backend deployment
cd backend
npm install --production
pm2 restart civicwatch-backend

# Frontend deployment
cd ../frontend
npm run build
sudo cp -r build/* /var/www/html/

# Restart Nginx
sudo nginx -t && sudo systemctl reload nginx

echo "Deployment complete!"
```

## 📞 Support and Troubleshooting

### Common Issues:
1. **CORS errors**: Update backend CORS settings
2. **Database connection**: Check MongoDB URI and network access
3. **Environment variables**: Ensure all required variables are set
4. **Build failures**: Check Node.js version compatibility
5. **API endpoints**: Verify frontend API URLs match backend routes

### Testing Deployment:
```bash
# Test backend health
curl https://your-domain.com/api

# Test frontend
# Visit https://your-domain.com in browser

# Check logs
pm2 logs civicwatch-backend
sudo journalctl -u nginx
```

## 🎯 Production Checklist

- [ ] Environment variables configured
- [ ] Database connection tested
- [ ] SSL certificate installed
- [ ] Firewall configured
- [ ] Backup strategy implemented
- [ ] Monitoring set up
- [ ] Error logging configured
- [ ] Performance testing completed
- [ ] Security audit performed
- [ ] Domain and DNS configured

---

**Next Steps:**
1. Choose your deployment platform
2. Set up production database
3. Configure environment variables
4. Deploy backend
5. Build and deploy frontend
6. Set up monitoring and backups

For specific platform deployment assistance, let me know which option you prefer!
