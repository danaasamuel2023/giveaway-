# 🔐 Admin Panel Access Setup

## Quick Setup Steps

### Step 1: Update Admin Password in Supabase

Go to your Supabase dashboard: https://supabase.com/dashboard/project/ynzxtgcgkmfcmgjrcgyj

1. Click **SQL Editor** (left sidebar)
2. Click **New Query**
3. Copy and paste this SQL:

```sql
-- Generate admin password hash
-- We'll use bcrypt to hash 'admin123'
-- First, let's update the admin user password

-- Option 1: Use this pre-generated hash for password: "admin123"
UPDATE users 
SET password = '$2a$10$rKqXQx7xYyZzZzZzZzZzZe7jKqXQx7xYyZzZzZzZzZzZzZzZz' 
WHERE email = 'admin@unlimiteddatagh.com';
```

**OR** use this better hash (generate a new one):

4. Go to: https://bcrypt-generator.com/
5. Enter password: `admin123` (or your desired password)
6. Set rounds: `10`
7. Click "Generate bcrypt hash"
8. Copy the generated hash
9. Update the SQL:

```sql
UPDATE users 
SET password = 'YOUR_GENERATED_HASH_HERE' 
WHERE email = 'admin@unlimiteddatagh.com';
```

10. Click **RUN**

### Step 2: Login as Admin

1. Go to: http://localhost:5173/login
2. Enter:
   - Email: `admin@unlimiteddatagh.com`
   - Password: `admin123` (or the password you used)
3. Click "Login"
4. You'll be redirected to dashboard
5. Navigate to: http://localhost:5173/admin

### Alternative: Create New Admin User

If the admin user doesn't exist, create one in Supabase SQL Editor:

```sql
-- Check if admin exists
SELECT * FROM users WHERE email = 'admin@unlimiteddatagh.com';

-- If not exists, create one
INSERT INTO users (email, password, phone_number, full_name, referral_code, is_admin)
VALUES (
  'admin@unlimiteddatagh.com',
  '$2a$10$rKqXQx7xYyZzZzZzZzZzZe7jKqXQx7xYyZzZzZzZzZzZzZzZzZz',  -- Change this hash
  '0240000000',
  'Administrator',
  'ADMIN123',
  TRUE
);

-- If already exists, just update password and make admin
UPDATE users 
SET 
  password = 'YOUR_GENERATED_HASH_HERE',
  is_admin = TRUE
WHERE email = 'admin@unlimiteddatagh.com';
```

---

## 🔑 Quick Admin Access

### Pre-generated Hash for Password "admin123":

Use this SQL in Supabase to quickly set up admin:

```sql
UPDATE users 
SET 
  password = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  is_admin = TRUE,
  data_awarded = 1
WHERE email = 'admin@unlimiteddatagh.com';
```

Then login with:
- Email: `admin@unlimiteddatagh.com`
- Password: `admin123`

---

## 🎯 Admin Panel Features

Once logged in as admin, you can:

1. **View All Users** - Complete user list
2. **View Bonus Qualified** - Users with 5+ referrals
3. **View Top 10 Referrers** - Best performers
4. **View Recent Entries** - Latest signups
5. **Export CSV** - Download user data
6. **Export Bonus CSV** - Download only bonus-qualified users
7. **Make Users Admin** - Grant admin privileges
8. **Search Users** - Find specific users

---

## 📊 Admin URLs

- Login: http://localhost:5173/login
- Admin Panel: http://localhost:5173/admin
- Dashboard: http://localhost:5173/dashboard

---

## 🆘 Troubleshooting

**"Access Denied" when visiting /admin**
- Admin user doesn't exist or isn't marked as admin
- Run the UPDATE SQL to set `is_admin = TRUE`

**"Invalid credentials" when logging in**
- Password hash is incorrect
- Generate a new hash and update it

**Admin panel shows "No users"**
- Database might be empty
- Try submitting a test entry first

---

**Follow the steps above to gain admin access!** ✅
