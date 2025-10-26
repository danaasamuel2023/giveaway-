# 🔧 Update Vercel Backend Environment Variable

## 📝 Your Frontend URL
```
https://giveaway-jt3w.vercel.app
```

---

## 🎯 Update Backend FRONTEND_URL

### Step 1: Go to Vercel Dashboard
Visit: https://vercel.com/dashboard

### Step 2: Open Your Backend Project
- Click on your **backend** project

### Step 3: Go to Settings
- Click **"Settings"** tab
- Click **"Environment Variables"**

### Step 4: Update FRONTEND_URL
- Find the `FRONTEND_URL` variable
- Click **Edit**
- Change value to:
```
https://giveaway-jt3w.vercel.app
```
(No trailing slash!)

### Step 5: Save and Redeploy
- Click **Save**
- Go to **Deployments** tab
- Click **"..."** on latest deployment
- Click **Redeploy**

---

## ✅ After Redeploy

Your backend will now allow CORS from your frontend!

### Test It:
- Visit: https://giveaway-jt3w.vercel.app
- Try submitting a phone number
- Should work without CORS errors!

---

## 🧪 Quick Checklist

✅ Backend URL: `https://your-backend.vercel.app`
✅ Frontend URL: `https://giveaway-jt3w.vercel.app`
✅ Update backend `FRONTEND_URL` in Vercel
✅ Redeploy backend
✅ Test frontend - should work!

**Update the environment variable in Vercel now!** 🚀
