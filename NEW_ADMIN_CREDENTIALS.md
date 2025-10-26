# 🔐 New Admin Credentials

## ✅ Updated Admin Login

### New Credentials:
```
Email: sunumanfred14@gmail.com
Password: Kingfred4190
```

### Admin Panel URL:
```
http://localhost:5173/admin
```
(Or your production URL)

---

## 🚀 Setup in Supabase

### Run This SQL in Supabase:

Go to: https://supabase.com/dashboard/project/ynzxtgcgkmfcmgjrcgyj/editor

Copy and paste:
```sql
UPDATE users 
SET 
  email = 'sunumanfred14@gmail.com',
  password = '$2a$10$X8doUUX6OjwMqB8SL4e30.34CYP4/eOe4h5Y.9tLrKu17bMwvsnke',
  is_admin = TRUE
WHERE email = 'admin@unlimiteddatagh.com';

-- Or create if doesn't exist
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

## 🧪 Test Login

1. Go to: http://localhost:5173/login
2. Enter:
   - **Email:** sunumanfred14@gmail.com
   - **Password:** Kingfred4190
3. Click Login
4. Access admin panel!

---

## 🎯 After Deployment

When deployed to production:
- Login URL: https://your-site.vercel.app/login
- Admin URL: https://your-site.vercel.app/admin
- Use same credentials

**Run the SQL in Supabase and login with your new credentials!** ✅
