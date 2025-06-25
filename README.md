# 🌍 SocialSphere – Community Event Hub

**SocialSphere** is a full-stack, mobile-responsive platform that empowers users to create, join, and manage social development events like tree plantations, road cleanups, and donation drives in their local area. It’s designed to encourage active community involvement and social good.

---

## 🔗 Live Site

👉 [Visit SocialSphere Live](https://servesphere-4fb04.web.app)

---

## 🎯 Purpose

To build a digital platform that promotes real-world community service and social development by allowing users to engage in events that create positive local change.

---

## ✨ Key Features

* 🔐 Secure Email & Google Authentication
* 📆 Create and manage local social events (with validation)
* 📌 Browse and join upcoming events
* 🧾 Track events joined by the logged-in user
* 🛠️ Manage user-created events (Update/Delete)
* 🔍 Search and filter events by type and name
* 🎨 Theme toggle: Light/Dark mode
* ✅ Toast & SweetAlert for feedback messages
* 🔐 JWT token-based secure private routes
* 📷 Static gallery section
* 📰 Newsletter subscription design

---

## 🧱 Tech Stack

* **Frontend**: React, Tailwind CSS, DaisyUI, Axios, Vite
* **Backend**: Node.js, Express.js, MongoDB, Firebase Auth
* **Authentication**: Firebase, JWT
* **Routing**: React Router v7
* **State Management**: React Hooks
* **Date Picker**: React Datepicker
* **UI Enhancements**: SweetAlert2, React Toastify

---

## 🚀 Installation & Setup

### ✅ Prerequisites

* Node.js (v18+)
* MongoDB Atlas

### 🔧 Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/kawser-ahmed-nihad/ServeSphere.git
cd socialsphere
```

2. **Frontend Setup**

```bash
cd client
npm install
```

3. **Backend Setup**

```bash
cd server
npm install
```

4. **Environment Variables**

Create `.env` files in both `client/` and `server/` directories:

**Client (`client/.env`)**

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
```

**Server (`server/.env`)**

```env
PORT=5000
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
```

5. **Run locally**

```bash
# From root directory
cd client && npm run dev
cd ../server && npm run start
```

---

## 📁 Folder Structure

```bash
/
├── client/ (React frontend)
│   ├── components/
│   ├── pages/
│   ├── routes/
│   └── main.jsx
├── server/ (Node + Express backend)
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── index.js
└── README.md
```

---

## 📄 Pages Overview

* **Home Page**: Banner + Features + Gallery + Newsletter
* **Login/Register**: Auth with validation & social login
* **Create Event**: Add new social events (private)
* **Upcoming Events**: Public page to browse events (with filter + search)
* **View Event**: Private, dynamic page with join button
* **Joined Events**: All events the user has joined
* **Manage Events**: View and update user-created events
* **404 Page**: Custom not-found route

---

## ✅ Form Validations

* **Register/Login**:

  * Password must contain uppercase, lowercase, and be 6+ characters
  * Show error messages if invalid

* **Create/Update Event**:

  * Future date only validation
  * Required: title, type, date, location, image URL

---

## 🔐 JWT Authentication

* JWT generated at login and stored in localStorage
* Token attached to protected route requests
* Backend verifies token for access

---

## 🧪 Bonus Features (Challenges Completed)

* ✅ Private route persistence on reload
* ✅ Event search & filter (with MongoDB)
* ✅ Theme toggle (Dark/Light)
* ✅ JWT secured backend
* ✅ Gallery and Newsletter sections
* ✅ SweetAlert and Toastify integrated

---

## 🔌 Dependencies

```json
"dependencies": {
  "axios": "^1.5.0",
  "firebase": "^11.10.0",
  "jwt-decode": "^4.0.0",
  "react": "^19.1.0",
  "react-datepicker": "^8.4.0",
  "react-dom": "^19.1.0",
  "react-router-dom": "^7.6.2",
  "react-toastify": "^9.1.2",
  "sweetalert2": "^11.10.0",
  "tailwindcss": "^4.1.10"
},
"devDependencies": {
  "@vitejs/plugin-react": "^4.4.0",
  "daisyui": "^5.0.43",
  "vite": "^6.3.5"
}
```

---

## 🧑‍💻 Author

Made with ❤️ by Kawser Ahmed Nihad

---

## 📜 License

This project is licensed under the MIT License.
