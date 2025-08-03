<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# UCC HostelFinder Project Instructions

This is a full-stack web application for University of Cape Coast students to find and browse hostels. The project consists of:

## Frontend (React + Vite)
- Built with React 18 and Vite
- Uses Tailwind CSS for styling
- Material Icons for UI icons
- React Router for navigation
- Axios for API calls

## Backend (Node.js + Express)
- Express.js server with MongoDB
- Mongoose for database modeling
- RESTful API endpoints for hostels
- CORS enabled for frontend communication

## Key Features
- Search hostels by name, location, price range
- Filter by amenities (kitchen, WiFi, etc.)
- View detailed hostel information
- Real-time vacancy status
- Room type information (1 room 1 meter, shared, etc.)
- Contact information with WhatsApp integration
- Responsive design for mobile and desktop

## Development Guidelines
- Use functional components with React hooks
- Follow Tailwind CSS utility-first approach
- Use Material Icons for consistent iconography
- Maintain responsive design principles
- Keep API endpoints RESTful
- Use proper error handling in both frontend and backend
- Follow MongoDB best practices for data modeling

## API Endpoints
- GET /api/hostels - List hostels with filtering
- GET /api/hostels/:id - Get single hostel details
- GET /api/hostels/featured/list - Get featured hostels
- POST /api/hostels - Create new hostel (admin)
- PUT /api/hostels/:id - Update hostel
- DELETE /api/hostels/:id - Delete hostel

## Database Schema
- Hostels collection with comprehensive fields including amenities, room types, pricing, contact info, and ratings
