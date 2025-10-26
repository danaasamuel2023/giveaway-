# 🔧 Setup Admin User in Supabase NOW

## ❌ Error: "Invalid credentials"
This happens because the admin user doesn't exist in the database yet.

---

## ✅ Quick Fix: Create Admin User

### Step 1: Go to Supabase SQL Editor
Visit: https://supabase.com/dashboard/project/ynzxtgcgkmfcmgjrcgyj/editor

### Step 2: Click "New Query"

### Step 3: Run This SQL:

```sql
-- Create admin user with your credentials
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
) 
ON CONFLICT (email) DO UPDATE SET 
  password = '$2a$10$X8doUUX6OjwMqB8SL4e30.34CYP4/eOe4h5Y.9tLrKu17bMwvsnke',
  is_admin = TRUE;
```

### Step 4: Click "RUN"

### Step 5: You should see "Success" message

---

## 🧪 Test Login Now

### 1. Go to: http://localhost:5173/login

### 2. Enter:
```
Email: sunumanfred14@gmail.com
Password: Kingfred4190
```

### 3. Click "Login"

### 4. Should work now!

---

## ✅ Verify User Was Created

### Check in Supabase:
1. Go to: https://supabase.com/dashboard/project/ynzxtgcgkmfcmgjrcgyj/table-editor
2. Click **users** table
3. Look for email: **sunumanfred14@gmail.com**
4. Check `is_admin` column is: **TRUE**

---

## 🎯 After Login

Once logged in, go to:
- Admin Panel: http://localhost:5173/admin
- Dashboard: http://localhost:5173/dashboard

**Run the SQL above and try login again!** ✅
