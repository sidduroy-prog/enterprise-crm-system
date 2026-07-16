# Enterprise CRM System

A full-stack Customer Relationship Management (CRM) system for managing leads, customers, and sales pipelines, built with role-based access control for Admins and Sales Representatives.

## Tech Stack
- **Frontend:** React.js (Vite), React Router, Recharts
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT-based authentication with role-based access control

## Features
- 🔐 User authentication (Register/Login) with JWT
- 👥 Role-based access control (Admin / Sales Rep)
- 📋 Lead tracking (Create, Update, Delete, Status tracking: New → Contacted → Qualified → Won/Lost)
- 💼 Sales pipeline / deal management (Kanban-style stages: Prospecting → Proposal → Negotiation → Closed)
- 📝 Activity logs per lead (notes, calls, emails, meetings)
- 📊 Dashboard with conversion rate, total leads, and status breakdown chart

## Project Structure
```
crm-system/
├── backend/
│   ├── config/db.js
│   ├── models/ (User, Lead, Deal, Activity)
│   ├── middleware/auth.js
│   ├── routes/ (auth, leads, deals, activities, dashboard)
│   └── server.js
└── frontend/
    └── src/
        ├── api/axios.js
        ├── context/AuthContext.jsx
        ├── components/ (Navbar, ProtectedRoute)
        └── pages/ (Login, Register, Dashboard, Leads, Deals)
```

## Setup Instructions

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and connects to the backend API at `http://localhost:5000/api`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login and get JWT |
| GET | /api/auth/me | Get logged-in user |
| GET/POST/PUT/DELETE | /api/leads | Manage leads |
| GET/POST/PUT/DELETE | /api/deals | Manage deals |
| GET/POST | /api/activities | Manage activity logs |
| GET | /api/dashboard/stats | Dashboard analytics |

## Author
Siddu (MCA)
