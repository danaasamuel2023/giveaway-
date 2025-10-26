# 🚀 Deploy Your Giveaway Site

## ✅ Deployment Steps

### Prerequisites:
- ✅ Git repository ready
- ✅ Vercel account (vercel.com)
- ✅ Supabase configured
- ✅ Code complete

---

## 📋 Step-by-Step Deployment

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Giveaway site ready for deployment"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

---

### Step 2: Deploy Backend to Vercel

1. Go to: https://vercel.com
2. Click **"Add New Project**
3. Import your **GitHub repository**
4. Set up project:
   - **Framework Preset:** Other
   - **Root Directory:** backend
   - **Install Command:** `npm install`
   - **Build Command:** (leave empty)
   - **Output Directory:** (leave empty)

5. **Environment Variables:**
   - `SUPABASE_URL` = Your Supabase project URL
   - `SUPABASE_KEY` = Your Supabase anon key
   - `JWT_SECRET` = Any random string (e.g., `your-secret-key-here`)
   - `FRONTEND_URL` = https://your-frontend.vercel.app

6. Click **Deploy**

---

### Step 3: Deploy Frontend to Vercel

1. Go to: https://vercel.com
2. Click **"Add New Project**
3. Same repository
4. Set up project:
   - **Framework Preset:** Vite
   - **Root Directory:** frontend
   - **Install Command:** `npm install`
   - **Build Command:** `npm run build`
   - **Output Directory:** dist

5. **Environment Variables:**
   - `VITE_API_URL` = https://your-backend.vercel.app

6. Click **Deploy**

---

## 🌐 Your Live URLs

After deployment:

### Frontend:
- https://your-frontend.vercel.app

### Backend:
- https://your-backend.vercel.app
- Health: https://your-backend.vercel.app/health

---

## 🔧 Update Environment Variables

### Backend (.env):
```
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-key
JWT_SECRET=your-secret-key
PORT=5000
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend (.env):
```
VITE_API_URL=https://your-backend.vercel.app
```

---

## ✅ Post-Deployment Checklist

1. ✅ Test home page
2. ✅ Test phone submission
3. ✅ Test admin login
4. ✅ Test admin panel
5. ✅ Test exports
6. ✅ Update any hardcoded URLs

---

## 🎯 Quick Deploy Commands

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy Backend
cd backend
vercel --prod

# Deploy Frontend
cd frontend
vercel --prod
```

---

## 📝 Environment Setup

### In Supabase:
Run this SQL to add admin:
```sql
UPDATE users 
SET password = '$2a$10$Z9duZU4BCNNjYG82mRjNeuq2QGv5u3/sfHM75qRYoIautbdfzWW3i',
    is_admin = TRUE
WHERE email = 'admin@unlimiteddatagh.com';
```

---

## 🎉 You're Ready!

Your site will be live at:
- Frontend: https://your-frontend.vercel.app
- Admin: https://your-frontend.vercel.app/admin

**Start deploying now!** 🚀
