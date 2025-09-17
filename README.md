# SIH-2025: Coastal Hazard Reporting System TeamDreamOps

A comprehensive full-stack application for reporting and managing coastal hazards, built for Smart India Hackathon 2025. This system enables users to report various coastal hazards like tsunamis, oil spills, coastal erosion, and more, with real-time tracking and management capabilities.

## 🌊 Features

- **Multi-Platform Support**: Web frontend and mobile UI for comprehensive accessibility
- **Real-time Hazard Reporting**: Report coastal hazards with location data and media uploads
- **User Authentication**: Secure login and registration system
- **Dashboard Analytics**: Comprehensive dashboard for monitoring reported incidents
- **Social Integration**: Social media features for community engagement
- **Incident Management**: Track incident status from pending to resolved
- **Media Upload**: Support for image and video uploads with incidents
- **Geolocation Support**: GPS coordinates for precise hazard location tracking

## 🏗️ Project Structure

```
SIH-2025/
├── backend/                 # Node.js Express API server
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── db/                 # Database connection
│   ├── middleware/         # Custom middleware
│   ├── models/             # MongoDB data models
│   ├── routes/             # API routes
│   └── uploads/            # File upload storage
├── web-frontend/           # React.js web application
│   └── src/
│       └── components/     # React components by developer
├── mobile-UI/              # Mobile application (in development)
└── README.md              # This file
```

## 🚀 Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Multer** - File upload handling
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Git

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/sih-coastal-hazards
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The backend server will start on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd web-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The frontend will start on `http://localhost:5173`

### Production Build

**Backend**
```bash
cd backend
npm start
```

**Frontend**
```bash
cd web-frontend
npm run build
npm run preview
```

## 📊 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `GET /profile` - Get user profile (protected)

### Incident Routes (`/api/reports`)
- `GET /` - Get all incidents
- `POST /` - Create new incident report
- `GET /:id` - Get specific incident
- `PUT /:id` - Update incident
- `DELETE /:id` - Delete incident

## 🗃️ Database Schema

### Incident Model
```javascript
{
  hazardType: String, // Tsunami, Oil Spill, etc.
  severity: String,   // Low, Medium, High, Extreme
  description: String,
  locationDescription: String,
  latitude: Number,
  longitude: Number,
  timeOfObservation: Date,
  mediaUrl: String,
  mediaType: String,  // image, video
  status: String,     // pending, verified, resolved, rejected
  timestamps: true
}
```

### User Model
```javascript
{
  username: String,
  email: String,
  password: String, // hashed
  role: String,     // user, admin
  timestamps: true
}
```

## 🎯 Supported Hazard Types

- **Tsunami** - Seismic sea waves
- **Storm Surge** - Coastal flooding from storms
- **High Waves** - Dangerous wave conditions
- **Rip Current** - Strong water currents
- **Algal Bloom** - Harmful algae outbreaks
- **Oil Spill** - Marine pollution incidents
- **Marine Debris** - Ocean waste and debris
- **Coastal Erosion** - Shoreline degradation
- **Other Hazard** - Custom hazard reporting

## 📱 Application Pages

### Web Frontend Routes
- `/` - Landing page with hazard information
- `/login` - User authentication
- `/register` - New user registration
- `/incident` - Report new hazard incident
- `/dashboard` - Analytics and incident management
- `/socials` - Community and social features
- `/incident/:id` - View/edit specific incident

## 👥 Development Team Structure

The project is organized by developer contributions:

- **Chaitanya** - Landing page and incident reporting forms
- **Dipak** - Authentication system (login/register)
- **Omkar** - Dashboard and social features
- **Manoj** - Mobile UI development (in progress)

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- CORS protection
- Input validation and sanitization
- Secure file upload handling
- Environment variable protection

## 📂 File Upload System

- **Storage Location**: `backend/uploads/incidents/`
- **Supported Formats**: Images (JPG, PNG, WebP), Videos
- **File Naming**: Timestamp-based unique naming
- **Access**: Static file serving via Express

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=production-secret-key
FRONTEND_URL=https://your-frontend-domain.com
```

### Recommended Deployment Platforms
- **Backend**: Heroku, Railway, DigitalOcean
- **Frontend**: Vercel, Netlify, AWS S3
- **Database**: MongoDB Atlas, AWS DocumentDB

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



---

**Built with ❤️ for Smart India Hackathon 2025**
