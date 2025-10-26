# 🚀 Complete Deployment Help Guide

## 📋 Quick Overview

Your code is ready on GitHub: https://github.com/danaasamuel2023/giveaway-

You need to deploy:
1. **Backend** (Node.js API)
2. **Frontend** (React/Vite)

---

## 🎯 Step 1: Deploy Backend

### A) Create Backend Project
1. Go to: **https://vercel.com/new**
2. Click **"Import Git Repository"**
3. Find: `danaasamuel2023/giveaway-`
4. Click it to select

### B) Configure Settings
Fill in these fields:
```
Project Name: giveaway-backend
Framework Preset: Other
Root Directory: LEAVE EMPTY (blank)
Build Command: (leave empty)
Output Directory: (leave empty)
```

### C) Add Environment Variables
Click **"Environment Variables"** and add these 5:

**Variable 1:**
- Key: `SUPABASE_URL`
- Value: `https://ynzxtgcgkmfcmgjrcgyj.supabase.co`

**Variable 2:**
- Key: `SUPABASE_KEY`
- Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inluenh0Z2Nna21mY21nanJjZ3lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0MjcwOTUsImV4cCI6MjA3NzAwMzA5NX0.bKjJeP8IyZOvl2QLM0MIZJCEFuzz4yWaLARd6OAd2RI`

**Variable 3:**
- Key: `JWT_SECRET`
- Value: `giveaway-secret-key-2025`

**Variable 4:**
- Key: `PORT`
- Value: `5000`

**Variable 5:**
- Key: `FRONTEND_URL`
- Value: `https://YOUR-FRONTEND-URL.vercel.app`
  *(You'll update this after deploying frontend!)*

### D) Deploy
1. Click **"Deploy"** button
2. Wait 2-3 minutes
3. **Copy your backend URL** (e.g., `https://giveaway-backend.vercel.app`)

---

## 🎨 Step 2: Deploy Frontend

### A) Create Frontend Project
1. Go back to: **https://vercel.com/new**
2. Click **"Import Git Repository"** again
3. Select same: `danaasamuel2023/giveaway-`

### B) Configure Settings
```
Project Name: giveaway-frontend
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
```

### C) Add Environment Variable
Click **"Environment Variables"** and add:

**Variable:**
- Key: `VITE_API_URL`
- Value: `https://YOUR-BACKEND-URL.vercel.app`
  *(Use the backend URL from Step 1!)*

### D) Deploy
1. Click **"Deploy"** button
2. Wait 2-3 minutes
3. **Copy your frontend URL** (e.g., `https://giveaway-frontend.vercel.app`)

---

## 🔄 Step 3: Link Backend to Frontend

### Update Backend FRONTEND_URL:

1. Go to Vercel dashboard
2. Click on your **backend** project
3. Go to **Settings** → **Environment Variables**
4. Find `FRONTEND_URL`
5. Click **Edit**
6. Change value to your frontend URL
7. Click **Save**
8. Go to **Deployments** tab
9. Click **"..."** on latest deployment
10. Click **Redeploy**

---

## 🎉 Step 4: Test Your Site

### Visit Frontend URL:
```
https://your-frontend.vercel.app
```

### Test:
1. Submit a phone number
2. See if it works
3. Check admin panel

---

## 🔑 Step 5: Set Up Admin User

### Go to Supabase SQL Editor:
https://supabase.com/dashboard/project/ynzxtgcgkmfcmgjrcgyj/editor

### Run This SQL:
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

### Login:
- URL: https://your-frontend.vercel.app/login
- Email: `admin@unlimiteddatagh.com`
- Password: `admin123`

---

## ✅ Summary

**Deploy Order:**
1. ✅ Backend first (get URL)
2. ✅ Frontend second (use backend URL)
3. ✅ Update backend FRONTEND_URL
4. ✅ Redeploy backend
5. ✅ Set up admin user
6. ✅ Test everything

**Time:** ~10-15 minutes total

**Start now:** https://vercel.com/new 🚀
