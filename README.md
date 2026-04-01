# CivicWatch - Community Infrastructure Monitoring System

A modern web/mobile platform where citizens can report infrastructure issues such as potholes, broken streetlights, water leakage, garbage overflow, and damaged public property in their area. Built with Material Design 3 and featuring a beautiful, responsive interface.

## 🚀 Features

- **User Authentication**: Register and login system with JWT
- **Issue Reporting**: Upload photos, provide location details, and describe issues
- **Location-based Reporting**: GPS location capture or manual entry
- **Real-time Issue Tracking**: View status updates (Pending, In Progress, Resolved)
- **Admin Dashboard**: Authorities can view, verify, and update issue status
- **Map Visualization**: Display issues on an interactive map
- **Filtering**: Filter issues by type and status
- **Responsive Design**: Mobile-friendly interface

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Multer** for file uploads
- **Cloudinary** for image storage

### Frontend
- **React.js** with React Router
- **Material Design 3** with custom color system
- **Tailwind CSS** for styling
- **Google Fonts**: Manrope (headlines) + Inter (body)
- **Material Symbols** icons
- **Axios** for API calls
- **Context API** for state management

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account (for image uploads)
- Google Maps API key (optional, for map integration)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd civicwatch
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the `backend` directory:
```env
MONGODB_URI=mongodb://localhost:27017/civicwatch
JWT_SECRET=your_jwt_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### 4. Start Backend Server
```bash
npm run dev
```

### 5. Frontend Setup
```bash
cd frontend
npm install
```

### 6. Start Frontend Development Server
```bash
npm start
```

## 🗂️ Project Structure

```
civicwatch/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Issue.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── issues.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── PrivateRoute.js
│   │   │   └── AdminRoute.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── ReportIssue.js
│   │   │   ├── AdminDashboard.js
│   │   │   └── MapView.js
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Issues
- `GET /api/issues` - Get all issues (with filtering)
- `GET /api/issues/:id` - Get issue by ID
- `POST /api/issues` - Create new issue (authenticated)
- `PUT /api/issues/:id/status` - Update issue status (admin only)
- `GET /api/issues/nearby/:lat/:lng` - Get nearby issues

## 👥 User Roles

### Regular User
- Register and login
- Report infrastructure issues
- View dashboard with all issues
- Filter issues by type and status
- View map of reported issues

### Admin User
- All regular user permissions
- Access admin dashboard
- View detailed issue statistics
- Update issue status (Pending → In Progress → Resolved)

## 📊 Issue Types

- 🕳️ **Pothole** - Road damage and potholes
- 💡 **Streetlight** - Broken or malfunctioning streetlights
- 💧 **Water Leakage** - Water pipe leaks and drainage issues
- 🗑️ **Garbage Overflow** - Overflowing bins and waste management
- 🏛️ **Public Property** - Damage to public buildings and facilities
- ⚠️ **Other** - Miscellaneous infrastructure issues

## 🗺️ Map Integration

The application includes a placeholder for Google Maps integration. To enable the interactive map:

1. Get a Google Maps JavaScript API key from the Google Cloud Console
2. Add the API key to your backend `.env` file
3. Replace the placeholder map component with the actual Google Maps implementation

## 📱 Mobile Responsiveness

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes for authenticated users
- Admin-only routes for sensitive operations
- Input validation and sanitization

## 🚀 Deployment

### Backend Deployment
- Deploy to services like Heroku, Vercel, or AWS
- Configure environment variables
- Set up MongoDB Atlas for production database

### Frontend Deployment
- Deploy to services like Vercel, Netlify, or GitHub Pages
- Configure API endpoints for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 📧 Support

For any questions or issues, please contact the development team.

---

**Resume Ready Description:**
Developed CivicWatch - a modern Community Infrastructure Monitoring System using MERN stack with Material Design 3. Implemented real-time issue tracking, photo/location reporting, admin dashboard, and responsive design to improve civic engagement and infrastructure resolution efficiency.
