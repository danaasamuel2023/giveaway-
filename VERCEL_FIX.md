# 🔧 Vercel Deployment Fix

## ❌ The Problem

Error: "The specified Root Directory "backend" does not exist"

## ✅ Solution 1: Deploy From Root

### Instead of using "Root Directory", deploy from root with this setup:

#### Backend Deployment:

1. Go to: https://vercel.com/new
2. Import: `giveaway-` repository
3. **Leave Root Directory EMPTY**
4. **Build Command:** `cd backend && npm install && echo 'Backend built'`
5. **Framework:** Other

6. **Environment Variables:**
   ```
   SUPABASE_URL=https://ynzxtgcgkmfcmgjrcgyj.supabase.co
   SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inluenh0Z2Nna21mY21nanJjZ3lqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0MjcwOTUsImV4cCI6MjA3NzAwMzA5NX0.bKjJeP8IyZOvl2QLM0MIZJCEFuzz4yWaLARd6OAd2RI
   JWT_SECRET=giveaway-secret-2025
   PORT=5000
   FRONTEND_URL=https://YOUR-FRONTEND.vercel.app
   ```

---

## ✅ Solution 2: Update Vercel Configuration

I've updated the `vercel.json` files to fix this issue.

### Now Deploy With These Settings:

#### Backend:
- **Framework:** Other (or None)
- **Root Directory:** LEAVE EMPTY (deploy from root)
- **Build Command:** (leave empty or use the updated vercel.json)
- **Install Command:** `npm install`

#### Frontend:
- **Framework:** Vite
- **Root Directory:** Leave empty
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

---

## 🚀 Recommended Approach

### Deploy Each Separately:

#### Backend:
1. Create new project in Vercel
2. Import: `giveaway-` repo
3. **Settings → General:**
   - Root Directory: **empty** (root)
   - Build Command: (leave default)
   - Output Directory: **empty**
4. **Settings → Environment Variables:** Add all 5 vars
5. Deploy

#### Frontend:
1. Create another project in Vercel
2. Import: `giveaway-` repo
3. **Settings → General:**
   - Root Directory: **empty** (root)
   - Build Command: `cd frontend && npm run build`
   - Output Directory: `frontend/dist`
4. **Settings → Environment Variables:** Add `VITE_API_URL`
5. Deploy

---

## 📝 Alternative: Monorepo Setup

If you want proper monorepo support:

### Create vercel.json in root:

```json
{
  "projects": [
    {
      "name": "giveaway-backend",
      "root": "backend",
      "buildCommand": "npm install && echo 'Built'"
    },
    {
      "name": "giveaway-frontend", 
      "root": "frontend",
      "buildCommand": "npm run build",
      "outputDirectory": "dist"
    }
  ]
}
```

But for now, **just leave Root Directory empty** and Vercel will use the vercel.json in backend/ and frontend/ folders!

---

## ✅ Quick Fix

**Just leave Root Directory EMPTY when deploying!**

The `vercel.json` files I updated will handle the rest automatically.

Try deploying again with empty root directory! 🚀
