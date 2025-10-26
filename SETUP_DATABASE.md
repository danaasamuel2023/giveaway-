# Database Setup Instructions

Your Supabase credentials are configured. Now you need to create the database tables.

## Quick Setup Steps

### 1. Go to Supabase Dashboard
Visit: https://ynzxtgcgkmfcmgjrcgyj.supabase.co

### 2. Navigate to SQL Editor
- Click **SQL Editor** in the left sidebar
- Click **New Query**

### 3. Run the Schema

Copy and paste the ENTIRE content from `backend/schema.sql` into the SQL Editor, then click **RUN**.

The schema creates:
- `users` table with all required fields
- `referrals` table for tracking referrals  
- Indexes for performance
- Default admin user (password needs to be set)

### 4. Update Admin Password

After running the schema, update the admin password:

**Option A: Generate hash using this Node.js command:**
```javascript
const bcrypt = require('bcryptjs');
bcrypt.hash('your_password', 10).then(hash => console.log(hash));
```

**Option B: Use online tool:**
https://bcrypt-generator.com/
- Enter your desired password
- Set rounds to 10
- Copy the generated hash

Then in Supabase SQL Editor, run:
```sql
UPDATE users SET password = 'your_generated_hash' WHERE email = 'admin@unlimiteddatagh.com';
```

### 5. Test the Backend

Once the database is set up, test the signup by:
1. Going to http://localhost:5173/signup
2. Filling in the form
3. Submitting

You should now be redirected to the dashboard!

## What the Schema Does

The SQL creates:
- **users table:** Stores user accounts with referral codes
- **referrals table:** Tracks who referred whom
- **Indexes:** For fast lookups on email, phone, referral code
- **Default admin:** Creates initial admin account

The backend is already running and connected to your Supabase instance!

## Troubleshooting

**Error: "Failed to create user"**
- Check if tables exist in Supabase
- Verify schema was run successfully
- Check backend logs for specific errors

**Error: "Connection refused"**
- Verify backend is running on port 5000
- Check .env file is in backend folder

**Error: "Invalid credentials"**
- Verify SUPABASE_URL and SUPABASE_KEY in backend/.env
- Make sure no extra spaces or quotes in credentials
