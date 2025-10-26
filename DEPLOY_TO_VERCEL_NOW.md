# 🚀 Deploy to Vercel - Step by Step

## 📋 Prerequisites

✅ GitHub repository: https://github.com/danaasamuel2023/giveaway-
✅ Code pushed and ready
✅ Vercel account (sign up at vercel.com if needed)

---

## 🎯 Deploy Backend First

### Step 1: Create Backend Project

1. **Go to:** https://vercel.com/new
2. **Import Git Repository:**
   - Click "Import Git Repository"
   - Find and select: `giveaway-` (danaasamuel2023)

3. **Configure Project:**
   ```
   Framework Preset: Other
   Root Directory: backend
   Build Command: (leave empty)
   Output Directory: (leave empty)
   Install Command: npm install
   ```

### Step 2: Add Environment Variables

Click "Environment Variables" and add:

```
SUPABASE_URL = https://ynzxtgcgkmfcmgjrcgyj.supabase.co
```

```
SUPABASE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inluenh0Z2Nna21mY21nanJjZ3lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0MjcwOTUsImV4cCI6MjA3NzAwMzA5NX0.bKjJeP8IyZOvl2QLM0MIZJCEFuzz4yWaLARd6OAd2RI
```

```
JWT_SECRET = giveaway-secret-key-2025
```

```
PORT = 5000
```

```
FRONTEND_URL = https://YOUR-FRONTEND-URL.vercel.app
```
(You'll update this after deploying frontend!)

### Step 3: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Copy your backend URL (e.g., `https://giveaway-backend.vercel.app`)

---

## 🌐 Deploy Frontend

### Step 1: Create Frontend Project

1. **Go back to:** https://vercel.com/new
2. **Import Same Repository:**
   - Click "Import" again
   - Select same `giveaway-` repo

3. **Configure Project:**
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

### Step 2: Add Environment Variable

```
VITE_API_URL = https://YOUR-BACKEND-URL.vercel.app
```
(Use the backend URL from Step 3 above!)

### Step 3: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Copy your frontend URL (e.g., `https://giveaway-frontend.vercel.app`)

---

## 🔄 Update Environment Variables

### Update Backend FRONTEND_URL:

1. Go to Vercel dashboard
2. Click on your **backend** project
3. Go to **Settings** → **Environment Variables**
4. Find `FRONTEND_URL`
5. Click **Edit**
6. Update to: `https://YOUR-FRONTEND-URL.vercel.app`
7. Click **Save**
8. Click **Redeploy**

---

## 🎯 Your Live URLs

After deployment, you'll have:

### Frontend:
```
https://your-frontend.vercel.app
```

### Backend:
```
https://your-backend.vercel.app
```

### Admin Panel:
```
https://your-frontend.vercel.app/admin
```

---

## 🔑 Admin Login

After deployment, set up admin:

### Step 1: Go to Supabase SQL Editor
https://supabase.com/dashboard/project/ynzxtgcgkmfcmgjrcgyj/editor

### Step 2: Run This SQL:
```sql
INSERT INTO users (email, password, phone_number, full_name, referral_code, is_admin, data_awarded)
VALUES (
  'admin@unlimiteddatagh.com',
  '$2a$10$Z9duZU4BCNNjYG82mRjNeuq2QGv5u3/sfHM75qRYoIautbdfzWW3i',
  '0240000000',
  'Administrator',
  'ADMIN123',
  TRUE,
  1
) ON CONFLICT (email) DO UPDATE SET 
  password = '$2a$10$Z9duZU4BCNNjYG82mRjNeuq2QGv5u3/sfHM75qRYoIautbdfzWW3i',
  is_admin = TRUE;
```

### Step 3: Test Login
- Go to: https://your-frontend.vercel.app/login
- Email: `admin@unlimiteddatagh.com`
- Password: `admin123`

---

## ✅ Summary

**Backend Environment Variables:**
- SUPABASE_URL
- SUPABASE_KEY
- JWT_SECRET
- PORT
- FRONTEND_URL

**Frontend Environment Variables:**
- VITE_API_URL

**After Deploy:**
1. Update backend FRONTEND_URL
2. Redeploy backend
3. Set up admin user in Supabase
4. Test your live site!

**Start deploying now at vercel.com!** 🚀
