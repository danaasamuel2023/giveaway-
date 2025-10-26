# 🔧 Fix "Connection error" - Frontend Can't Reach Backend

## ❌ Problem
The frontend at `https://giveaway-jt3w.vercel.app` can't connect to the backend.

---

## ✅ Fix: Add Backend URL to Frontend

### Step 1: Find Your Backend URL

1. Go to: https://vercel.com/dashboard
2. Click on your **backend** project
3. Copy the URL (e.g., `https://giveaway-backend.vercel.app`)
4. **Keep this URL!**

---

### Step 2: Update Frontend Environment Variable

1. Go to: https://vercel.com/dashboard
2. Click on your **frontend** project (giveaway-jt3w)
3. Go to **Settings** → **Environment Variables**
4. Find `VITE_API_URL` or create it:
   ```
   Key: VITE_API_URL
   Value: https://YOUR-BACKEND-URL.vercel.app
   ```
5. **Replace** `YOUR-BACKEND-URL` with your actual backend URL

---

### Step 3: Redeploy Frontend

1. Go to **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **Redeploy**

Wait 2-3 minutes for deployment to complete.

---

### Step 4: Test

Visit: https://giveaway-jt3w.vercel.app
- Should connect to backend now!
- No more "Connection error"!

---

## 🎯 Quick Checklist

✅ Backend deployed on Vercel? (Check dashboard)
✅ Backend URL copied?
✅ Frontend has `VITE_API_URL` environment variable?
✅ `VITE_API_URL` points to backend URL?
✅ Frontend redeployed after adding variable?

**Update the `VITE_API_URL` in frontend Vercel settings!** 🚀
