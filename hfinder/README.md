# UCC HostelFinder

A comprehensive web application for University of Cape Coast students to find and browse hostels with real-time availability and detailed information.

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
