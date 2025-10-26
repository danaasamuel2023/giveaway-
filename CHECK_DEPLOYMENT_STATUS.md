# 🔍 Check Your Deployment Status

## 🎯 Where Are You Getting "Connection error"?

### A) On Production (Vercel)?
URL: https://giveaway-jt3w.vercel.app
→ Need to set VITE_API_URL in Vercel

### B) On Local Development?
URL: http://localhost:5173
→ Backend not running or wrong URL

---

## ✅ Quick Checklist

### 1. Is Backend Deployed on Vercel?
- Go to: https://vercel.com/dashboard
- Do you see a **backend** project?
- **If NO** → Deploy backend first!
- **If YES** → Copy the backend URL

### 2. Is VITE_API_URL Set in Frontend?
- In Vercel dashboard
- Click on **frontend** project
- Go to **Settings** → **Environment Variables**
- Look for `VITE_API_URL`
- **Is it set?** → Check if value is correct
- **Is it missing?** → Add it!

### 3. What Should VITE_API_URL Be?
```
VITE_API_URL = https://your-backend.vercel.app
```
Replace `your-backend` with your actual backend project name!

---

## 🚀 Deploy Backend First (If Not Deployed)

### If Backend is NOT on Vercel:

1. Go to: https://vercel.com/new
2. Import repository: `giveaway-`
3. Configure:
   - **Project Name:** giveaway-backend
   - **Root Directory:** (leave empty)
   - **Framework:** Other
4. **Environment Variables:**
   ```
   SUPABASE_URL=https://ynzxtgcgkmfcmgjrcgyj.supabase.co
   SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inluenh0Z2Nna21mY21nanJjZ3lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0MjcwOTUsImV4cCI6MjA3NzAwMzA5NX0.bKjJeP8IyZOvl2QLM0MIZJCEFuzz4yWaLARd6OAd2RI
   JWT_SECRET=giveaway-secret-2025
   PORT=5000
   FRONTEND_URL=https://giveaway-jt3w.vercel.app
   ```
5. Deploy and **copy the backend URL**

---

## 🔧 Then Update Frontend

1. Go to Vercel dashboard
2. Click on **giveaway-jt3w** (frontend)
3. **Settings** → **Environment Variables**
4. Add/Edit:
   ```
   VITE_API_URL = https://YOUR-BACKEND-URL.vercel.app
   ```
5. **Redeploy** frontend

---

## ❓ What's Your Backend URL?

Tell me:
1. Is backend deployed on Vercel? (Yes/No)
2. What's the backend URL? (if deployed)

Then I can help you set VITE_API_URL correctly! ✅
