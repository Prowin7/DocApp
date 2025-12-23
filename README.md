# 🥼 Doctor Appointment Website

A full-stack web application for managing doctor appointments with separate platforms for patients, doctors, and administrators.

Front-end-deploy link - https://doc-appointment-frontend-lovat.vercel.app/

## 📋 Table of Contents
- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Demo](#demo)

## 💡 About

This Doctor Appointment Website is a comprehensive healthcare scheduling system built to streamline the process of booking and managing medical appointments. Developed over three weeks, this project incorporates modern web technologies and best practices to create an intuitive user experience.

The application consists of three interconnected platforms:
- **Frontend**: Patient-facing application for browsing doctors and booking appointments
- **Backend**: RESTful API server managing all business logic and data
- **Admin Panel**: Administrative interface for managing doctors, specializations, and system settings

## ✨ Features

### Patient Features
- User authentication (Sign Up / Sign In)
- Browse all available doctors
- Filter doctors by specialization
- View detailed doctor profiles
- Book appointments with selected date/time
- Manage appointments (view and cancel)
- User profile management
- Contact and About pages

### Admin Features
- Add and manage doctor profiles
- Manage doctor specializations
- Edit doctor qualifications and credentials
- View and manage system appointments
- Monitor user activity

### General Features
- Secure user authentication
- Responsive design
- Real-time notifications
- User-friendly interface
- Data validation and error handling

## ⚡ Tech Stack

| Category | Technologies |
|----------|---------------|
| **Frontend** | React.js, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Build Tool** | Vite |
| **HTTP Client** | Axios |
| **Routing** | React Router |
| **Notifications** | React Toastify |

## 📦 Dependencies

```json
{
  "axios": "^x.x.x",
  "react-router-dom": "^x.x.x",
  "react-toastify": "^x.x.x",
  "tailwindcss": "^x.x.x"
}
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (Free Cluster from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Git** (for cloning the repository)

## 🔧 Installation

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/doctor-appointment-website.git
cd doctor-appointment-website
```

### Step 2: Set Up Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@clusterName.xxxxxxx.mongodb.net/doctor-appointment
PORT=4000
REACT_APP_API_URL=http://localhost:4000/api
```

### Step 3: Install Dependencies

#### Backend
```bash
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

#### Admin Panel
```bash
cd admin
npm install
```

## 🚀 Running the Project

### Backend Server

```bash
# From the root directory
npm run server
```

The backend server will start on **http://localhost:4000**

### Frontend Application

```bash
# From the frontend directory
cd frontend
npm run dev
```

The frontend application will start on **http://localhost:5173**

### Admin Panel

```bash
# From the admin directory
cd admin
npm run dev
```

The admin panel will start on **http://localhost:5174**

## 📁 Project Structure

```
doctor-appointment-website/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── admin/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🎯 User Guide

### For Patients
1. Create an account or sign in
2. Navigate to "All Doctors" page
3. Filter doctors by specialization if needed
4. Click on a doctor to view their profile
5. Select your preferred appointment date and time
6. Confirm the booking
7. Manage your appointments from your profile

### For Administrators
1. Log in to the admin panel
2. Access the dashboard
3. Navigate to "Add Doctor" to create a new doctor profile
4. Fill in doctor details (name, specialization, credentials, etc.)
5. Submit to save the doctor profile
6. Monitor appointments and user activity from the dashboard
## 🌐 Deployment Guide

To deploy the full MERN stack (backend, frontend, admin panel) for a live demo:

### 1. Deploy MongoDB
- Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) to create a free cluster and get your connection string.
- Update your backend `.env` with this URI.

### 2. Deploy Backend (Node.js/Express)
- Push your backend code to GitHub.
- Use [Render](https://render.com), [Railway](https://railway.app), or [Heroku](https://heroku.com) to deploy.
- Set build/start commands (`npm install`, `npm start`) and add environment variables (MongoDB URI, JWT secret, etc.).
- Deploy and get your backend API URL (e.g., `https://your-backend.onrender.com`).

### 3. Deploy Frontend and Admin (React)
- Push your frontend and admin code to GitHub (separate repos or folders).
- Use [Vercel](https://vercel.com) or [Netlify](https://netlify.com) for each React app.
- Set build commands (`npm install`, `npm run build`).
- Set the environment variable for the backend API URL (e.g., `REACT_APP_API_URL=https://your-backend.onrender.com/api`).
- Deploy and get your live URLs.

### 4. Test and Share
- Visit your frontend and admin URLs, test all features.
- If you see CORS errors, update your backend to allow requests from your frontend/admin domains.
- Share the live URLs for frontend, admin, and backend API as your demo.

**Tip:** Always use environment variables for secrets and URLs. For a single domain, use a reverse proxy or custom domain routing, but for demos, separate URLs are fine.

## 📸 Demo

The application includes the following key screens:
- Landing/Home page
- Doctor listing and search page
- Doctor profile page
- Appointment booking interface
- User profile and appointment management
- Admin dashboard
- Doctor management panel

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 🆘 Troubleshooting

- **MongoDB Connection Error**: Verify your MongoDB URI in the `.env` file and ensure your IP is whitelisted in MongoDB Atlas
- **Port Already in Use**: Change the port number in the `.env` file or kill the process using the port
- **Dependencies Installation Error**: Try deleting `node_modules` and `package-lock.json`, then run `npm install` again

## 📧 Contact

For questions or feedback, please feel free to reach out or open an issue on the repository.

---

**Made with ❤️ over 3 weeks of development**
