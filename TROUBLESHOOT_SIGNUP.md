# 🔧 Troubleshoot "Signup Failed" Error

## 🔍 Common Causes & Solutions

### 1. Backend Server Not Running
**Check:**
```bash
# Is backend running?
curl http://localhost:5000/health
```

**Solution:**
```bash
cd backend
npm run dev
```

---

### 2. Database Not Set Up
**Check:**
- Go to Supabase dashboard
- Check if `users` table exists

**Solution:**
Run this SQL in Supabase:
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
```

---

### 3. Supabase Environment Variables
**Check:**
- Backend `.env` file has correct values
- `SUPABASE_URL` is correct
- `SUPABASE_KEY` is correct

**Solution:**
Update `backend/.env`:
```
SUPABASE_URL=https://ynzxtgcgkmfcmgjrcgyj.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inluenh0Z2Nna21mY21nanJjZ3lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0MjcwOTUsImV4cCI6MjA3NzAwMzA5NX0.bKjJeP8IyZOvl2QLM0MIZJCEFuzz4yWaLARd6OAd2RI
```

---

### 4. Phone Number Already Exists
**Check:**
- Trying same phone twice?

**Solution:**
- Use different phone number (e.g., 0249998888)
- Or clear database if testing

---

### 5. Wrong API URL
**Check:**
- Frontend trying to connect to correct backend?

**Solution:**
Update `frontend/.env`:
```
VITE_API_URL=http://localhost:5000
```

---

## 🧪 Quick Test

### Test Backend:
```bash
# Check if backend is responding
curl http://localhost:5000/health

# Should return: {"status":"ok"}
```

### Test Database:
Go to Supabase dashboard → Table Editor → Check if `users` table exists

### Test Frontend Connection:
Open browser console on frontend page
- Look for API errors
- Check if requests are reaching backend

---

## ✅ Quick Fix Checklist

Run these commands:

```bash
# 1. Start Backend
cd backend
npm install
npm run dev

# 2. Start Frontend (new terminal)
cd frontend
npm install
npm run dev

# 3. Check Browser Console
# Open http://localhost:5173
# Press F12
# Look for errors in Console tab
```

---

## 🎯 Most Likely Fix

### 1. Restart Servers:
```bash
# Kill any existing servers
# Then:
cd backend && npm run dev
cd frontend && npm run dev
```

### 2. Check Browser Console:
- Open http://localhost:5173
- Press F12
- Go to Console tab
- Look for error message
- Tell me what error you see!

---

**What error do you see in the browser console?** 🔍
