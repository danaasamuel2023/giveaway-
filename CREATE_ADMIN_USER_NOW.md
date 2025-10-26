# 🔧 Create Admin User in Supabase NOW

## ❌ Problem: "Login failed"
The admin user doesn't exist in the database yet.

---

## ✅ Quick Fix - Create Admin User

### Step 1: Go to Supabase SQL Editor
Visit: https://supabase.com/dashboard/project/ynzxtgcgkmfcmgjrcgyj/editor

### Step 2: Click "New Query"

### Step 3: Copy & Paste This SQL:

```sql
-- Create admin user
INSERT INTO users (
  email, 
  password, 
  phone_number, 
  full_name, 
  referral_code, 
  is_admin, 
  data_awarded
)
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

### Step 4: Click "RUN"

### Step 5: Should see "Success" message

---

## 🧪 Login Now

### Credentials:
```
Email: sunumanfred14@gmail.com
Password: Kingfred4190
```

### URLs:
**Local:** http://localhost:5173/login
**Production:** https://giveaway-jt3w.vercel.app/login

### After Login:
- Admin Panel: https://giveaway-jt3w.vercel.app/admin

---

## ✅ Verify User Was Created

1. Go to: https://supabase.com/dashboard/project/ynzxtgcgkmfcmgjrcgyj/table-editor
2. Click **users** table
3. Look for: `sunumanfred14@gmail.com`
4. Check: `is_admin = TRUE`

---

**Run the SQL above and login should work!** ✅
