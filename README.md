# DevelopersHub — Full-Stack Agency Platform

A complete agency platform with dynamic content management, service handling, and client interaction features. Built as a full-stack internship project.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB (Atlas) |
| Auth | JWT (JSON Web Tokens) |
| Deployment | Vercel (frontend) + Render (backend) |

## Features

**User Side**
- Home, About, Services, Portfolio pages
- Contact form (leads stored in database)
- Meeting/appointment booking system
- Blog viewing

**Admin Panel**
- Secure JWT login
- Add / Edit / Delete services
- Manage portfolio projects
- Manage blog posts (CRUD)
- View and manage client inquiries
- View scheduled meetings

## Project Structure

```
developershub/
├── backend/
│   ├── config/
│   │   └── seed.js          # Database seeding script
│   ├── middleware/
│   │   └── auth.js          # JWT auth middleware
│   ├── models/              # Mongoose models
│   │   ├── User.js
│   │   ├── Blog.js
│   │   ├── Booking.js
│   │   ├── Inquiry.js
│   │   ├── Portfolio.js
│   │   └── Service.js
│   ├── routes/              # Express route handlers
│   │   ├── auth.js
│   │   ├── blog.js
│   │   ├── bookings.js
│   │   ├── inquiries.js
│   │   ├── portfolio.js
│   │   └── services.js
│   ├── server.js            # Entry point
│   ├── .env.example         # Environment variable template
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/             # Axios instance
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # Auth context
│   │   ├── pages/
│   │   │   ├── admin/       # Admin dashboard pages
│   │   │   └── user/        # Public-facing pages
│   │   └── main.jsx
│   ├── .env.example         # Environment variable template
│   ├── vercel.json          # Vercel SPA routing config
│   └── package.json
└── README.md
```

---

## Local Development Setup

### Prerequisites
- Node.js 18+
- A MongoDB Atlas account (free tier is fine)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/developershub.git
cd developershub
```

### 2. Set up the backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and fill in your MongoDB URI, JWT secret, etc.
```

### 3. Set up the frontend
```bash
cd ../frontend
npm install
cp .env.example .env
# Edit .env — set VITE_API_URL=http://localhost:5000/api
```

### 4. Seed the database (creates admin user + sample data)
```bash
cd backend
npm run seed
```

### 5. Run both servers
```bash
# Terminal 1 — backend
cd backend && npm run dev

# Terminal 2 — frontend
cd frontend && npm run dev
```

Frontend runs at: http://localhost:5173  
Backend API runs at: http://localhost:5000  
Admin panel: http://localhost:5173/admin/login

---

## Deployment Guide

### Step 1 — MongoDB Atlas
1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) and create a free M0 cluster
2. Database Access → Add a database user (username + strong password)
3. Network Access → Add IP `0.0.0.0/0` (allows Render to connect)
4. Connect → Get your connection string (replace `<password>` with your actual password)

### Step 2 — Deploy Backend to Render
1. Go to [render.com](https://render.com) → New → Web Service
2. Connect your GitHub repo
3. Settings:
   - **Root directory:** `backend`
   - **Build command:** `npm install`
   - **Start command:** `node server.js`
4. Add environment variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/developershub
   JWT_SECRET=<generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))">
   JWT_EXPIRE=7d
   NODE_ENV=production
   FRONTEND_URL=https://your-project.vercel.app
   ADMIN_NAME=Your Name
   ADMIN_USERNAME=admin
   ADMIN_EMAIL=admin@youremail.com
   ADMIN_PASSWORD=YourStrongPassword123!
   ```
5. Deploy — copy the Render URL (e.g. `https://developershub-api.onrender.com`)

### Step 3 — Seed the database on Render
In Render dashboard → your service → **Shell** tab:
```bash
node config/seed.js
```

### Step 4 — Deploy Frontend to Vercel
1. Go to [vercel.com](https://vercel.com) → New Project → import your GitHub repo
2. Settings:
   - **Root directory:** `frontend`
   - **Framework preset:** Vite
3. Add environment variable:
   ```
   VITE_API_URL=https://your-render-app.onrender.com/api
   ```
4. Deploy — copy the Vercel URL and update `FRONTEND_URL` in Render

### Step 5 — Verify
- Visit your Vercel URL — the site should load
- Visit `https://your-render-app.onrender.com/api/health` — should return `{"success":true}`
- Login at `/admin/login` with the credentials you set in env vars

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | No | Admin login |
| GET | `/api/auth/me` | Yes | Get current user |
| GET | `/api/services` | No | List all services |
| POST | `/api/services` | Yes | Create service |
| PUT | `/api/services/:id` | Yes | Update service |
| DELETE | `/api/services/:id` | Yes | Delete service |
| GET | `/api/portfolio` | No | List portfolio |
| POST | `/api/portfolio` | Yes | Add portfolio item |
| PUT | `/api/portfolio/:id` | Yes | Update portfolio item |
| DELETE | `/api/portfolio/:id` | Yes | Delete portfolio item |
| GET | `/api/blog` | No | List blog posts |
| POST | `/api/blog` | Yes | Create blog post |
| PUT | `/api/blog/:id` | Yes | Update blog post |
| DELETE | `/api/blog/:id` | Yes | Delete blog post |
| GET | `/api/inquiries` | Yes | View all inquiries |
| POST | `/api/inquiries` | No | Submit contact form |
| GET | `/api/bookings` | Yes | View all bookings |
| POST | `/api/bookings` | No | Submit booking |
| GET | `/api/health` | No | Health check |

---

## Security Features

- Helmet.js for secure HTTP headers
- express-mongo-sanitize to prevent NoSQL injection
- Rate limiting (100 req/15min general, 10 req/15min on login)
- bcryptjs password hashing (12 salt rounds)
- JWT authentication on all admin routes
- CORS restricted to frontend URL in production
- Input validation with express-validator

## Environment Variables Reference

See `backend/.env.example` and `frontend/.env.example` for full reference.  
**Never commit actual `.env` files to version control.**
