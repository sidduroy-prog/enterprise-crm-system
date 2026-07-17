# Enterprise CRM System

A full-stack Customer Relationship Management (CRM) system for managing leads, customers, and sales pipelines, built with role-based access control for Admins and Sales Representatives.

## Tech Stack
- **Frontend:** React.js (Vite), React Router, Recharts
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT-based authentication with role-based access control

## Features
- User authentication (Register/Login) with JWT
- Role-based access control (Admin / Sales Rep)
- Lead tracking (Create, Update, Delete, Status tracking)
- Sales pipeline / deal management (Kanban-style stages)
- Activity logs per lead
- Dashboard with conversion rate and status breakdown chart

## Setup Instructions

### Backend
```bash
cd crm-system/backend
npm install
cp .env.example .env
npm run dev
```

### Frontend
```bash
cd crm-system/frontend
npm install
npm run dev
```

## Author
Siddu (MCA)
