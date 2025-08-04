# UCC HostelFinder - Production Deployment Guide

## 🌐 Cloud Database Setup (MongoDB Atlas)

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Sign up for a free account
3. Create a new project: "UCC-HostelFinder"

### 2. Create Database Cluster
1. Click "Build a Database"
2. Choose "M0 Sandbox" (Free tier)
3. Select region: "AWS - Ireland (eu-west-1)" (closest to Ghana)
4. Name your cluster: "hostelfinder-cluster"

### 3. Database Access Setup
1. Go to "Database Access" in left sidebar
2. Add new database user:
   - Username: `your_username` (choose a secure username)
   - Password: Generate strong password
   - Database User Privileges: "Read and write to any database"

### 4. Network Access Setup
1. Go to "Network Access" in left sidebar
2. Add IP Address: "0.0.0.0/0" (Allow access from anywhere)
   - Note: In production, restrict to your server IPs

### 5. Get Connection String
1. Go to "Database" → "Connect"
2. Choose "Connect your application"
3. Copy the connection string (MongoDB URI)
4. Replace `<password>` with your database user password

Your connection string will look like:
```
mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/hostel_finder?retryWrites=true&w=majority
```

## 🚀 Deployment Options

### Option A: Vercel (Recommended for Frontend + Serverless)
- ✅ Free tier available
- ✅ Automatic deployments from GitHub
- ✅ Global CDN
- ✅ Serverless functions for backend

### Option B: Heroku (Full-Stack)
- ✅ Easy deployment
- ✅ Free tier (with limitations)
- ✅ Built-in database support

### Option C: Railway/Render (Modern alternatives)
- ✅ Simple deployment
- ✅ Good free tiers
- ✅ GitHub integration

## 📋 Pre-Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Environment variables configured
- [ ] Production build tested
- [ ] Domain name acquired (optional)
- [ ] SSL certificate (handled by platform)

## 🔧 Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/hostel_finder
FRONTEND_URL=https://your-domain.vercel.app
```
