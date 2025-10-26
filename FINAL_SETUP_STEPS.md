# 🎯 Final Setup Steps - Almost Done!

## Current Status

✅ Frontend running on http://localhost:5173  
✅ Backend running on http://localhost:5000  
✅ Environment variables configured  
⚠️ **Database tables need to be created**

## Create Tables in Supabase (2 Minutes)

### Option 1: Using Supabase Dashboard (Recommended)

1. **Go to**: https://supabase.com/dashboard/project/ynzxtgcgkmfcmgjrcgyj
2. **Click**: "SQL Editor" (left sidebar)
3. **Click**: "New Query"
4. **Open**: `init-database.sql` from project root
5. **Copy ALL content** from that file
6. **Paste** into Supabase SQL Editor
7. **Click**: "RUN" button
8. **Wait for**: "Success" message

### Option 2: Manual Copy-Paste

Copy this SQL and paste into Supabase SQL Editor:

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  phone_number TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  referral_code TEXT UNIQUE NOT NULL,
  referred_by UUID REFERENCES users(id) ON DELETE SET NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  data_awarded INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create referrals table
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  referee_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(referrer_id, referee_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_referral_code ON users(referral_code);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone_number);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referee ON referrals(referee_id);
```

## After Creating Tables

### 1. Restart Backend (Required)
The backend needs to reconnect with the new database:

```bash
# Stop current backend (Ctrl+C in the terminal)
cd backend
npm run dev
```

### 2. Test Signup
Go to: http://localhost:5173/signup

Try signing up with:
- Name: Your Name
- Email: your@email.com
- Phone: 0241234567
- Password: password123

### 3. If Signup Works
You should be redirected to the dashboard showing:
- Your data reward (1GB)
- Referral count (0)
- Your referral link to share

## Set Admin Password (Optional)

After successful signup test, you can set up admin access:

1. Go to: https://bcrypt-generator.com/
2. Enter password (e.g., `admin123`)
3. Set rounds: `10`
4. Generate hash
5. Go to Supabase SQL Editor and run:

```sql
UPDATE users 
SET password = 'YOUR_GENERATED_HASH' 
WHERE email = 'admin@unlimiteddatagh.com';
```

Then login at: http://localhost:5173/admin

## Troubleshooting

**Error: "Failed to create user"**
- Check backend is running
- Verify tables were created successfully
- Check backend terminal for specific errors

**Backend won't start**
- Verify .env file exists in backend folder
- Check SUPABASE_URL and SUPABASE_KEY are correct

**Signup success but can't access dashboard**
- Check browser console for errors
- Verify localStorage has token

## You're Almost There!

Once the tables are created, your giveaway site will be **fully functional**! 🎉

The frontend UI is already beautiful and ready.
Just need those database tables and you're good to go!
