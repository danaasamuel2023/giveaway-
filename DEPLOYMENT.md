# Deployment Guide

This guide will help you deploy the giveaway site to Vercel and Supabase.

## Prerequisites

- Supabase account at https://supabase.com
- Vercel account at https://vercel.com
- GitHub account (optional, for easier deployment)

## Step 1: Setup Supabase Database

1. Go to https://supabase.com and create a new project
2. Once your project is ready, note the following:
   - Project URL (Settings → API → Project URL)
   - Anon Key (Settings → API → anon public key)
3. Go to SQL Editor in your Supabase dashboard
4. Copy and paste the contents of `backend/schema.sql`
5. Run the SQL script to create tables
6. **Important**: Update the admin password hash. Run this in Node.js:
   ```javascript
   const bcrypt = require('bcryptjs');
   const hash = await bcrypt.hash('your_admin_password', 10);
   console.log(hash);
   ```
7. Update the admin user in Supabase with the new hash:
   ```sql
   UPDATE users SET password = 'your_new_hash' WHERE email = 'admin@unlimiteddatagh.com';
   ```

## Step 2: Deploy Backend to Vercel

1. Install Vercel CLI (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. Navigate to backend directory:
   ```bash
   cd backend
   ```

3. Create `vercel.json` (already created) and add environment variables:
   ```bash
   vercel env add SUPABASE_URL
   vercel env add SUPABASE_KEY
   vercel env add JWT_SECRET
   vercel env add FRONTEND_URL
   ```

4. Deploy:
   ```bash
   vercel --prod
   ```

5. Note the deployment URL (e.g., `https://your-backend.vercel.app`)

## Step 3: Build Frontend

1. Navigate to frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```
   VITE_API_URL=https://your-backend.vercel.app
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Step 4: Deploy Frontend to Vercel

1. While in frontend directory, deploy:
   ```bash
   vercel --prod
   ```

2. Set the custom domain:
   ```bash
   vercel domains add www.unlimiteddatagh.com
   vercel domains add unlimiteddatagh.com
   ```

3. Update backend `FRONTEND_URL` environment variable to `https://www.unlimiteddatagh.com`

## Step 5: Update DNS

1. Go to your domain registrar
2. Add a CNAME record pointing `www.unlimiteddatagh.com` to `cname.vercel-dns.com`
3. Add an A record for root domain `unlimiteddatagh.com` (Vercel will provide the IP)

## Alternative: Deploy via GitHub

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Vercel will auto-detect and deploy both frontend and backend
4. Set environment variables in Vercel dashboard for both projects

## Environment Variables Summary

### Backend (Vercel)
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_KEY`: Your Supabase anon key
- `JWT_SECRET`: Random secret string for JWT signing
- `FRONTEND_URL`: `https://www.unlimiteddatagh.com`
- `PORT`: 5000 (optional)

### Frontend (Vercel)
- `VITE_API_URL`: Your backend URL (e.g., `https://your-backend.vercel.app`)

## Verification Checklist

- [ ] Supabase database created with tables
- [ ] Admin user created with known password
- [ ] Backend deployed to Vercel
- [ ] Frontend deployed to Vercel
- [ ] Custom domain configured
- [ ] SSL certificate active (automatic with Vercel)
- [ ] Environment variables set in both projects
- [ ] Test signup flow
- [ ] Test login flow
- [ ] Test admin panel access
- [ ] Test referral system

## Troubleshooting

### CORS Errors
- Ensure `FRONTEND_URL` in backend matches your frontend domain
- Check browser console for specific CORS errors

### Database Connection Issues
- Verify Supabase URL and key are correct
- Check Supabase dashboard for connection logs
- Ensure your IP is whitelisted (if applicable)

### Build Errors
- Check Node.js version (should be 18+)
- Review build logs in Vercel dashboard
- Ensure all environment variables are set

## Post-Deployment

1. Test the signup flow
2. Test the referral system
3. Export CSV from admin panel
4. Distribute data bundles using exported phone numbers
5. Monitor user registrations in admin panel

## Support

For issues or questions:
- Check Supabase logs in dashboard
- Check Vercel function logs in dashboard
- Review browser console for frontend errors
