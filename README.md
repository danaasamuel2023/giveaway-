# Professional Giveaway Site

A professional giveaway website for unlimiteddatagh.com featuring a referral-based data bundle promotion system.

## Features

- User registration with email, password, phone number, and optional referral code
- Referral tracking system with unique referral codes
- Rewards: 1GB for new users, 4GB bonus for 5 referrals
- Professional admin panel for user management
- CSV export for data bundle distribution
- Modern, responsive UI with Tailwind CSS

## Promo Details

- **Duration**: October 25-28, 2025
- **Reward**: 1GB for new users
- **Bonus**: 4GB for users with 5 referrals (total 5GB)
- **Goal**: Collect phone numbers for data bundle distribution

## Tech Stack

- **Frontend**: React 18, Vite, React Router, Tailwind CSS
- **Backend**: Node.js, Express, Supabase
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel (frontend + backend)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Vercel account

### Installation

1. Install all dependencies:
```bash
npm run install:all
```

2. Setup Supabase:
   - Create a new Supabase project at https://supabase.com
   - Get your project URL and anon key
   - Run the SQL schema from `backend/schema.sql` in your Supabase SQL editor

3. Configure environment variables:

**Backend** (`backend/.env`):
```
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
JWT_SECRET=your_random_jwt_secret_string
PORT=5000
FRONTEND_URL=http://localhost:5173
```

**Frontend** (`frontend/.env`):
```
VITE_API_URL=http://localhost:5000
```

### Development

Run both backend and frontend:
```bash
npm run dev
```

Or run separately:
```bash
npm run dev:backend
npm run dev:frontend
```

### Deployment

See `DEPLOYMENT.md` for detailed deployment instructions to Vercel.

## Project Structure

```
├── frontend/          # React frontend app
├── backend/           # Node.js Express backend
├── package.json       # Root package.json
└── README.md          # This file
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### User
- `GET /api/users/me` - Get current user profile
- `GET /api/users/referral-link` - Get referral link

### Admin
- `GET /api/admin/users` - List all users
- `GET /api/admin/export` - Export CSV
- `PATCH /api/admin/users/:id` - Toggle admin role

## License

MIT
