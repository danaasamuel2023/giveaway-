# Quick Supabase Setup Guide

The backend requires a Supabase database to function. Here's how to set it up quickly:

## Step 1: Create Supabase Account

1. Go to https://supabase.com
2. Click "Sign Up" (free tier works fine)
3. Sign up with email or GitHub

## Step 2: Create Project

1. Click "New Project"
2. Fill in:
   - **Name:** `giveaway-site` (or any name)
   - **Database Password:** Choose a strong password (save it!)
   - **Region:** Choose closest to you
3. Click "Create new project"
4. Wait 2-3 minutes for setup to complete

## Step 3: Get API Credentials

1. Go to **Settings** → **API**
2. Copy these two values:
   - **Project URL** (looks like: `https://xxxxxxxxxxxx.supabase.co`)
   - **anon public** key (long string of characters)

## Step 4: Create Tables

1. Click **SQL Editor** in the left sidebar
2. Open the file `backend/schema.sql`
3. Copy ALL the content from that file
4. Paste into the SQL Editor
5. Click **Run** (or press `Ctrl+Enter`)
6. You should see "Success" message

## Step 5: Configure Backend

1. Go to the `backend` folder
2. Create a file named `.env`
3. Add these lines (replace with YOUR values):

```
SUPABASE_URL=https://your_project_id.supabase.co
SUPABASE_KEY=your_anon_key_here
JWT_SECRET=my_super_secret_jwt_key_12345
PORT=5000
FRONTEND_URL=http://localhost:5173
```

## Step 6: Update Admin Password

The schema creates a default admin user. You need to set the password:

1. Go back to SQL Editor in Supabase
2. Run this to generate a password hash (in Node.js):
   ```javascript
   const bcrypt = require('bcryptjs');
   bcrypt.hash('your_admin_password', 10).then(hash => console.log(hash));
   ```
3. Or use this online tool: https://bcrypt-generator.com/
4. Copy the generated hash
5. In Supabase SQL Editor, run:
   ```sql
   UPDATE users SET password = 'your_generated_hash_here' WHERE email = 'admin@unlimiteddatagh.com';
   ```

## Step 7: Start Backend

```bash
cd backend
npm run dev
```

The backend will start on http://localhost:5000

## Step 8: Test Signup

Now you can test the signup/login flow!

1. Frontend is already running on http://localhost:5173
2. Backend is now running on http://localhost:5000
3. Go to http://localhost:5173/signup
4. Fill in the form and click "Sign Up"
5. You should be logged in and redirected to dashboard!

## Troubleshooting

**Error: "Missing Supabase environment variables"**
- Make sure you created `backend/.env` file
- Check that SUPABASE_URL and SUPABASE_KEY are correct

**Error: "Connection refused" or "Network error"**
- Verify your Supabase URL is correct
- Check that Supabase project is active

**Signup succeeds but shows error**
- Check browser console for errors
- Verify backend is running on port 5000
- Check Supabase logs in dashboard

## Alternative: Test Without Supabase (Mock Mode)

If you want to test the UI only without database:

The frontend can be tested for visual appearance, but the backend API calls will fail without Supabase.

You can see:
- ✅ All pages loading
- ✅ Form validation
- ✅ Navigation
- ✅ UI/UX flow

You can't test:
- ❌ Actual signup/login
- ❌ Database operations
- ❌ Referral tracking

---

**Need help?** Check the main SETUP.md file for more detailed instructions.
