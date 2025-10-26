# 🔐 Your Admin Login Credentials

## ✅ Admin Access

### Credentials:
```
Email: sunumanfred14@gmail.com
Password: Kingfred4190
```

### URLs:

**Local Development:**
- Login: http://localhost:5173/login
- Admin: http://localhost:5173/admin

**Production (After Deployment):**
- Login: https://your-site.vercel.app/login
- Admin: https://your-site.vercel.app/admin

---

## 🚀 Access Admin Panel

### Step 1: Go to Login Page
Visit: http://localhost:5173/login

### Step 2: Enter Credentials
- **Email:** `sunumanfred14@gmail.com`
- **Password:** `Kingfred4190`

### Step 3: Click "Login"

### Step 4: Go to Admin Panel
Visit: http://localhost:5173/admin

---

## 🔑 Setup in Supabase (If Not Done Yet)

Run this SQL in Supabase SQL Editor:

```sql
UPDATE users 
SET 
  email = 'sunumanfred14@gmail.com',
  password = '$2a$10$X8doUUX6OjwMqB8SL4e30.34CYP4/eOe4h5Y.9tLrKu17bMwvsnke',
  is_admin = TRUE
WHERE email = 'admin@unlimiteddatagh.com';

-- Or insert if doesn't exist
INSERT INTO users (email, password, phone_number, full_name, referral_code, is_admin, data_awarded)
VALUES (
  'sunumanfred14@gmail.com',
  '$2a$10$X8doUUX6OjwMqB8SL4e30.34CYP4/eOe4h5Y.9tLrKu17bMwvsnke',
  '0240000000',
  'Administrator',
  'ADMIN123',
  TRUE,
  1
) ON CONFLICT (email) DO UPDATE SET 
  password = '$2a$10$X8doUUX6OjwMqB8SL4e30.34CYP4/eOe4h5Y.9tLrKu17bMwvsnke',
  is_admin = TRUE;
```

---

## ✅ Quick Access

**Login Now:**
- http://localhost:5173/login
- Email: `sunumanfred14@gmail.com`
- Password: `Kingfred4190`

**Admin Panel:**
- http://localhost:5173/admin

---

## 📊 What You Can Do in Admin Panel

✅ View all users
✅ See total participants and referrals
✅ Export CSV files (Excel format)
✅ View bonus-qualified users (5+ refs)
✅ See top 10 referrers
✅ Check recent entries
✅ Manage user data

---

**Your admin panel is ready to use!** 🎯
