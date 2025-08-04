# UCC HostelFinder

A comprehensive web application for University of Cape Coast students to find and browse hostels with real# 🏠 UCC HostelFinder

A comprehensive web application for University of Cape Coast students to find and browse hostel accommodations with real-time availability, amenities, and student-friendly pricing.

![UCC HostelFinder](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🌟 Features

### 🔍 **Smart Search & Filtering**
- Search hostels by name, location, and amenities
- Advanced filtering by price range, room type, and facilities
- Real-time availability status
- Sort by price, distance, rating, or name

### 🏠 **Comprehensive Hostel Information**
- Detailed hostel profiles with high-quality images
- Room types (1 room 1 meter, shared, single, double)
- Pricing information and availability
- Amenities (WiFi, kitchen, security, parking, etc.)
- Contact information with WhatsApp integration

### 📱 **Responsive Design**
- Mobile-first design approach
- Optimized for all device sizes
- Material Design icons and modern UI
- Fast loading with optimized performance

### 🎯 **User Experience**
- Intuitive navigation and clean interface
- Pagination for large result sets
- Loading states and error handling
- SEO optimized for better discoverability

## 🛠️ Tech Stack

### **Frontend**
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Material Icons** - Consistent iconography
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Helmet** - Security middleware
- **Compression** - Response compression
- **Morgan** - HTTP request logger

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/nkkwame/HostelFinder.git
cd HostelFinder/hfinder
```

2. **Install dependencies**
```bash
npm install
cd backend && npm install
```

3. **Environment Setup**
```bash
# Copy environment template
cp backend/.env.example backend/.env

# Edit environment variables
# Update MongoDB URI and other settings
```

4. **Seed the database (optional)**
```bash
npm run seed
```

5. **Start development servers**
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 📜 Available Scripts

### Root Directory
```bash
npm run dev              # Start both frontend and backend
npm run dev:frontend     # Start only frontend
npm run dev:backend      # Start only backend
npm run build            # Build frontend for production
npm run start            # Build and start production server
npm run seed             # Seed database with sample data
npm run lint             # Run ESLint
```

### Backend Directory
```bash
npm start                # Start production server
npm run dev              # Start development server with nodemon
npm run seed             # Seed database
```

## 🌐 Deployment Guide

### 1. **Prepare for Production**

**Environment Variables:**
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/hostel_finder
```

**Build the application:**
```bash
npm run build
```

### 2. **Hosting Options**

#### **Option A: Vercel (Recommended for Frontend + Serverless Backend)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### **Option B: Heroku (Full-Stack)**
```bash
# Install Heroku CLI and login
heroku login

# Create app
heroku create ucc-hostelfinder

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri

# Deploy
git push heroku main
```

#### **Option C: DigitalOcean/AWS/VPS**
```bash
# Build application
npm run build

# Transfer files to server
# Install dependencies
npm install --production

# Start with PM2
pm2 start backend/server.js --name "hostelfinder"
```

### 3. **Database Setup**

#### **MongoDB Atlas (Cloud)**
1. Create account at [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create cluster and database
3. Get connection string
4. Update MONGODB_URI in environment variables

#### **Local MongoDB**
```bash
# Install MongoDB
# Start MongoDB service
mongod

# Use local connection string
MONGODB_URI=mongodb://localhost:27017/hostel_finder
```

### 4. **Domain & SSL**
- Point domain to hosting provider
- Configure SSL certificates (Let's Encrypt)
- Update CORS settings for production domain

## 📁 Project Structure

```
hfinder/
├── backend/                 # Backend API
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── server.js           # Express server
│   ├── seed.js             # Database seeder
│   └── package.json
├── src/                    # Frontend React app
│   ├── components/         # Reusable components
│   ├── pages/              # Page components
│   ├── services/           # API service layer
│   └── assets/             # Static assets
├── public/                 # Public assets
├── .vscode/                # VS Code settings
└── package.json            # Root package.json
```

## 🔧 Configuration

### Environment Variables
```env
# Backend (.env)
NODE_ENV=development|production
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hostel_finder
```

### Database Schema
The application uses a comprehensive hostel schema including:
- Basic information (name, description, location)
- Room types and pricing
- Amenities and facilities
- Contact information
- Ratings and reviews
- Images and media

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: [Your Name]
- **Institution**: University of Cape Coast
- **Purpose**: Student Accommodation Solution

## 📞 Support

For support and questions:
- Email: support@ucchostelfinder.com
- GitHub Issues: [Create an issue](https://github.com/nkkwame/HostelFinder/issues)

## 🙏 Acknowledgments

- University of Cape Coast for inspiration
- React and Node.js communities
- All contributors and testers

---

**Made with ❤️ for UCC Students**availability and detailed information.

## Features

### For Students
- **Smart Search**: Search hostels by name, location, or keywords
- **Advanced Filtering**: Filter by price range, room type, amenities, and location
- **Real-time Vacancy**: View current room availability
- **Detailed Information**: Complete hostel details including pricing, amenities, and contact info
- **Room Types**: Browse different accommodation options (1 room 1 meter, shared, single, double)
- **Amenity Filters**: Find hostels with kitchen, WiFi, parking, security, etc.
- **Contact Integration**: Direct WhatsApp, phone, and email contact options
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### For Hostel Owners
- **Hostel Listings**: Add and manage hostel information
- **Real-time Updates**: Update availability and pricing
- **Verification System**: Get verified status for increased visibility
- **Photo Gallery**: Showcase hostel facilities (coming soon)

## Technology Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Material Icons** - Consistent iconography

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hfinder
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the backend directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/hostel_finder
   JWT_SECRET=your_jwt_secret_key_here
   ```

5. **Start MongoDB**
   
   Make sure MongoDB is running on your system.

6. **Seed the database (optional)**
   ```bash
   cd backend
   node seed.js
   ```

7. **Start the development servers**
   
   Terminal 1 (Backend):
   ```bash
   cd backend
   npm run dev
   ```
   
   Terminal 2 (Frontend):
   ```bash
   npm run dev
   ```

8. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## API Endpoints

### Hostels
- `GET /api/hostels` - Get all hostels with optional filtering
- `GET /api/hostels/:id` - Get a specific hostel by ID
- `GET /api/hostels/featured/list` - Get featured hostels
- `POST /api/hostels` - Create a new hostel
- `PUT /api/hostels/:id` - Update a hostel
- `DELETE /api/hostels/:id` - Delete a hostel

### Query Parameters for /api/hostels
- `search` - Search by name, location, or description
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `roomType` - Filter by room type
- `hasKitchen` - Filter hostels with kitchen
- `hasWifi` - Filter hostels with WiFi
- `location` - Filter by location
- `sortBy` - Sort field (name, price, distance, rating)
- `sortOrder` - Sort order (asc, desc)
- `page` - Page number for pagination
- `limit` - Number of results per page

Built with ❤️ for University of Cape Coast students+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
