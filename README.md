# MediConnect 🩺

MediConnect is a full-stack doctor appointment booking web application built with the **MERN stack**. It allows patients to explore doctors, view doctor information, create an account, book appointments, and manage their profile and appointments.

## 🌐 Live Demo

**Frontend:** https://medi-connect2.netlify.app/

> The backend is deployed separately and connected to the frontend through environment variables.

## 📌 Features

### 👤 Patient Features
- User registration and login
- JWT-based authentication
- Browse all available doctors
- Filter doctors by speciality
- View doctor details
- Book appointments
- View booked appointments
- Cancel appointments
- View and update user profile
- Upload/update profile image

### 👨‍⚕️ Doctor/Admin Features
- Doctor management
- Doctor availability management
- View appointment information
- Manage doctor-related data

### 🔐 Security
- JWT authentication
- Password hashing
- Protected backend routes
- Environment variables for sensitive configuration
- MongoDB Atlas database

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- React Router
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt
- Multer

### Services
- MongoDB Atlas – Database
- Cloudinary – Image storage
- Render – Backend deployment
- Netlify – Frontend deployment

## 📁 Project Structure

```text
MediConnect/
│
├── frontend/          # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/           # Node.js + Express backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── admin/             # Doctor/Admin panel
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/gholapdnyaneshwari/MediConnect.git
cd MediConnect
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd backend
npm install
```

### 4. Install admin dependencies

```bash
cd admin
npm install
```

## 🔑 Environment Variables

Create a `.env` file inside the **backend** folder.

Example:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
```

For the frontend, create:

```env
VITE_BACKEND_URL=http://localhost:4000
```

For production, use your deployed Render backend URL instead of `localhost`.

> Never upload `.env` files or secret keys to GitHub.

## ▶️ Run the Project Locally

### Start Backend

```bash
cd backend
npm run server
```

or, if your project uses the dev script:

```bash
npm run dev
```

### Start Frontend

```bash
cd frontend
npm run dev
```

### Start Admin Panel

```bash
cd admin
npm run dev
```

Then open the local URL shown by Vite in your browser.

## 🔄 How It Works

```text
User
  ↓
React Frontend
  ↓
Axios API Requests
  ↓
Express.js Backend
  ↓
MongoDB Atlas
  ↓
Response
  ↓
React Frontend
```

Images are stored using **Cloudinary**, while authentication is handled using **JWT**.

## 🚀 Deployment

### Frontend
The frontend is deployed on **Netlify**.

Important environment variable:

```env
VITE_BACKEND_URL=<your-render-backend-url>
```

After changing a Vite environment variable on Netlify, trigger a new deployment so the new value is included in the frontend build.

### Backend
The backend is deployed on **Render** and connects to MongoDB Atlas.

Make sure the required backend environment variables are added in Render.

## 🧪 API Overview

Some of the main API routes include:

```text
/api/user/register
/api/user/login
/api/user/get-profile
/api/user/update-profile

/api/doctor/list
/api/doctor/details

/api/appointment/book
/api/appointment/user-appointments
/api/appointment/cancel
```

> Route names may vary depending on the current backend implementation.

## 📸 Project Highlights

- Responsive medical appointment platform
- Doctor speciality filtering
- Secure authentication
- Appointment management
- Profile management
- Cloud-based image upload
- MongoDB database integration
- Separate patient, doctor/admin, and backend components

## 🎯 Future Improvements

- Online payment integration
- Doctor reviews and ratings
- Email/SMS appointment notifications
- Video consultation
- Advanced doctor search and filtering
- Appointment reminders
- Improved admin dashboard
- Better mobile responsiveness

## 👩‍💻 Author

**Dnyaneshwari Gholap**

GitHub: https://github.com/gholapdnyaneshwari

## 📄 License

This project is created for learning and portfolio purposes.
