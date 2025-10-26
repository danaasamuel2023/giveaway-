# 🚀 Quick Deploy to Vercel

## ⚡ Fastest Way to Deploy

### Step 1: Initialize Git (if not done)
```bash
git init
git add .
git commit -m "Initial commit: Giveaway site"
```

### Step 2: Push to GitHub
```bash
# Create a new repo on GitHub, then:
git remote add origin YOUR_GITHUB_URL
git push -u origin main
```

### Step 3: Deploy via Vercel Dashboard

#### Backend:
1. Go to: https://vercel.com/new
2. Import your repository
3. Configure:
   - **Root Directory:** `backend`
   - **Framework:** Other
4. **Add Environment Variables:**
   ```
   SUPABASE_URL=ynzxtgcgkmfcmgjrcgyj.supabase.co
   SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   JWT_SECRET=your-random-secret-123
   FRONTEND_URL=https://your-site.vercel.app
   ```
5. Deploy!

#### Frontend:
1. Click "Add New Project" again
2. Same repo
3. Configure:
   - **Root Directory:** `frontend`
   - **Framework:** Vite
4. **Add Environment Variable:**
   ```
   VITE_API_URL=https://your-backend.vercel.app
   ```
5. Deploy!

---

## 📋 Pre-Deployment Checklist

### Backend:
- ✅ server.js exists
- ✅ package.json has scripts
- ✅ vercel.json configured
- ✅ Environment variables ready

### Frontend:
- ✅ Build works (`npm run build`)
- ✅ vercel.json configured
- ✅ Environment variables ready

---

## 🎯 After Deployment

### Update Frontend API URL:
Change in `frontend/src/utils/api.js` or use env variable

### Test:
1. Visit frontend URL
2. Test phone submission
3. Test admin login
4. Test exports

---

## ✅ Your Live Site

**Frontend:** https://your-site.vercel.app
**Backend:** https://your-backend.vercel.app
**Admin:** https://your-site.vercel.app/admin

**Login:** admin@unlimiteddatagh.com / admin123

---

## 🆘 Troubleshooting

**If CORS errors:**
- Check FRONTEND_URL in backend env
- Add correct domain to Supabase CORS settings

**If database errors:**
- Verify Supabase connection
- Check environment variables

**If build fails:**
- Check build logs in Vercel dashboard
- Test locally first (`npm run build`)

---

**Ready to deploy! Follow the steps above!** 🚀
