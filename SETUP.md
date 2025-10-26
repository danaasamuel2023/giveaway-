# Setup Instructions

Follow these steps to set up and run the giveaway site locally.

## Prerequisites

- Node.js 18 or higher installed
- npm or yarn package manager
- A Supabase account (free tier is sufficient)

## Step 1: Install Dependencies

Run this command from the root directory to install all dependencies:

```bash
npm run install:all
```

Or manually:
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
```

## Step 2: Setup Supabase

1. Create a new Supabase project at https://supabase.com
2. Go to Settings → API and copy:
   - Project URL
   - anon public key
3. Go to SQL Editor in your Supabase dashboard
4. Open the file `backend/schema.sql`
5. Copy all the SQL content and paste it into the SQL Editor
6. Click "Run" to create the tables
7. **Important**: Update the admin password by running this in Node.js:
   ```javascript
   const bcrypt = require('bcryptjs');
   bcrypt.hash('your_admin_password', 10).then(hash => console.log(hash));
   ```
8. Then update the admin user in Supabase:
   ```sql
   UPDATE users SET password = 'your_new_hash_here' WHERE email = 'admin@unlimiteddatagh.com';
   ```

## Step 3: Configure Backend

1. Navigate to the `backend` directory
2. Copy the `env.example` file to `.env`:
   ```bash
   cp env.example .env
   ```
3. Edit `.env` and fill in your Supabase credentials:
   ```
   SUPABASE_URL=your_supabase_project_url_here
   SUPABASE_KEY=your_supabase_anon_key_here
   JWT_SECRET=generate_a_random_secret_string
   PORT=5000
   FRONTEND_URL=http://localhost:5173
   ```

## Step 4: Configure Frontend

1. Navigate to the `frontend` directory
2. Copy the `env.example` file to `.env`:
   ```bash
   cp env.example .env
   ```
3. Edit `.env` and set the API URL:
   ```
   VITE_API_URL=http://localhost:5000
   ```

## Step 5: Run the Application

### Option A: Run Both Together (Recommended)

From the root directory:
```bash
npm run dev
```

### Option B: Run Separately

Terminal 1 (Backend):
```bash
npm run dev:backend
```

Terminal 2 (Frontend):
```bash
npm run dev:frontend
```

The backend will run on http://localhost:5000
The frontend will run on http://localhost:5173

## Step 6: Access the Application

1. Open http://localhost:5173 in your browser
2. Click "Sign Up" to create a test user
3. You can access the admin panel using the admin credentials you set in Supabase

## Testing the Features

### Test User Signup
- Go to http://localhost:5173/signup
- Fill in the form with test data
- Check that the user appears in the admin panel

### Test Referral System
- Sign up a user and get their referral code
- Sign up another user with that referral code in the "Referral Code" field
- Check that referral count increases

### Test Admin Panel
- Login with admin credentials
- Go to http://localhost:5173/admin
- You should see all users
- Test the export CSV functionality
- Test making another user an admin

## Troubleshooting

### Backend won't start
- Check that all environment variables are set in `backend/.env`
- Make sure port 5000 is not already in use
- Check the terminal for error messages

### Frontend won't start
- Check that all dependencies are installed
- Make sure port 5173 is not already in use
- Check the terminal for error messages

### Database connection errors
- Verify your Supabase URL and key are correct
- Check that you ran the schema.sql file in Supabase
- Check Supabase dashboard for connection logs

### CORS errors
- Ensure `FRONTEND_URL` in backend `.env` is set to `http://localhost:5173`
- Clear browser cache and reload

## Next Steps

Once everything is working locally, follow the `DEPLOYMENT.md` guide to deploy to production on Vercel.
