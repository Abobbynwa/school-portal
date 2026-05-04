# School Management Portal

A modern frontend for a full-stack school management system. It connects to the separate **School Backend API** and displays live backend data for students, staff, grades, and API health status.

## Overview

School Management Portal is built to support the daily operations of a school environment. It provides a foundation for managing students, staff, academic information, and administrative workflows through a clean web interface.

This project is part of my full-stack development portfolio and highlights my ability to design practical systems for real-world institutions, structure frontend dashboards, and connect user-facing workflows to backend services.

## Connected Backend

Backend repository:

```txt
https://github.com/Abobbynwa/school-backend
```

The frontend calls these backend endpoints:

```http
GET /api/health
GET /api/students
GET /api/staff
GET /api/grades
```

## Key Features

- Live backend API connection
- Backend health status display
- Student records fetched from API
- Staff records fetched from API
- Grade records fetched from API
- Admin-focused school management workflow
- Role-based dashboard concept for Admin, Staff, and Students
- Clean responsive user interface
- Scalable structure for future database and authentication integration

## User Roles

### Admin

- Register and manage students
- Register and manage staff
- Control school data records
- Manage dashboard-level operations

### Staff

- View assigned student or class-related information
- Support academic record workflows
- Participate in school communication and academic management features

### Student

- View personal profile information
- Access academic-related information
- Interact with student-facing dashboard features

## Tech Stack

- Frontend: React
- Build Tool: Vite
- Styling: CSS
- Icons: Lucide React
- Backend API: Node.js / Express
- Version Control: Git and GitHub

## Local Setup

Clone the repository:

```bash
git clone https://github.com/Abobbynwa/school-portal.git
cd school-portal
```

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
touch .env
```

Add your backend URL:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Vercel Deployment

Use these settings on Vercel:

```txt
Framework Preset: Vite
Install Command: npm install
Build Command: npm run build
Output Directory: dist
```

Add this environment variable in Vercel:

```env
VITE_API_BASE_URL=https://your-render-backend-url.onrender.com
```

After adding or changing environment variables, redeploy the Vercel project.

## Backend Deployment

Deploy the backend repository on Render:

```txt
Repository: Abobbynwa/school-backend
Build Command: npm install
Start Command: npm start
```

Then copy the Render backend URL and paste it into this frontend project's `VITE_API_BASE_URL` variable on Vercel.

## Portfolio Summary

**School Management Portal** is a full-stack education technology project focused on student, staff, and admin management. It demonstrates frontend dashboard design, backend API integration, system planning, and scalable school workflow architecture.

## Author

**Agaba Valentine**  
Full Stack Developer | Cybersecurity Enthusiast

- GitHub: https://github.com/Abobbynwa
- Portfolio: https://charming-pothos-c47293.netlify.app/
- LinkedIn: https://www.linkedin.com/in/valentine-agaba-526821229

## License

This project is open for learning, portfolio demonstration, and further development.
