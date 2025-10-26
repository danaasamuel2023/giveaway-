# 📍 Where is VITE_API_URL?

## 🎯 Location in Code

### File: `frontend/src/utils/api.js`
Line 3:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

This is where the frontend uses `VITE_API_URL` to connect to your backend!

---

## 🔧 How to Set It in Vercel

### When Deploying Frontend to Vercel:

1. Go to: https://vercel.com/new
2. Import your project
3. When configuring, click **"Environment Variables"**
4. Click **"Add Variable"**
5. Fill in:
   ```
   Key: VITE_API_URL
   Value: https://YOUR-BACKEND-URL.vercel.app
   ```
6. Save and deploy

---

## 📝 Example Values

### For Local Development:
```
VITE_API_URL = http://localhost:5000
```

### For Production (Vercel):
```
VITE_API_URL = https://giveaway-backend.vercel.app
```
(Replace with your actual backend URL!)

---

## ✅ Where It's Used

The `VITE_API_URL` is used in:
- **Location:** `frontend/src/utils/api.js`
- **Purpose:** Connects frontend to backend API
- **Default:** Falls back to `http://localhost:5000` if not set

---

## 🚀 Deployment Flow

1. **Deploy Backend First:**
   - Get backend URL: `https://your-backend.vercel.app`

2. **Then Deploy Frontend:**
   - Add environment variable:
     ```
     VITE_API_URL = https://your-backend.vercel.app
     ```

3. **Frontend uses this URL** to call your backend API!

---

## 🔍 Where Frontend Connects

Your frontend makes API calls like:
```javascript
// This uses VITE_API_URL
api.get('/api/giveaway/stats')
api.post('/api/giveaway/quick-entry', data)
```

The `api.js` file automatically prepends `VITE_API_URL` to all requests!

---

**So `VITE_API_URL` tells your frontend where to find the backend!** ✅
