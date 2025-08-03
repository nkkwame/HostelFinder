#!/bin/bash

# UCC HostelFinder - Quick Deployment Script

echo "🏠 UCC HostelFinder Deployment Setup"
echo "====================================="

# Step 1: Build production version
echo "📦 Building production version..."
npm run build

# Step 2: Install backend dependencies
echo "🔧 Installing backend dependencies..."
cd backend && npm install --production

# Step 3: Set up environment variables
echo "🌍 Setting up environment variables..."
echo "Please update backend/.env with your MongoDB Atlas connection string"

# Step 4: Test production build
echo "🧪 Testing production build..."
cd .. && npm run preview

echo "✅ Production build complete!"
echo ""
echo "🚀 Ready for deployment!"
echo ""
echo "Next steps:"
echo "1. Set up MongoDB Atlas database"
echo "2. Update backend/.env with your MONGODB_URI"
echo "3. Deploy to your chosen platform:"
echo "   - Vercel: npm i -g vercel && vercel"
echo "   - Heroku: git push heroku main"
echo "   - Railway: railway up"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
