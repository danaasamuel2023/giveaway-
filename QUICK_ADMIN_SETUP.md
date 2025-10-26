# ⚡ Quick Admin Setup - 2 Minutes!

## Set Admin Password in Supabase

### Step 1: Go to Supabase
Visit: https://supabase.com/dashboard/project/ynzxtgcgkmfcmgjrcgyj

### Step 2: Open SQL Editor
Click **SQL Editor** in the left sidebar, then **New Query**

### Step 3: Run This SQL
Copy and paste this SQL and click **RUN**:

```sql
-- Update admin password to 'admin123'
UPDATE users 
SET 
  password = '$2a$10$Z9duZU4BCNNjYG82mRjNeuq2QGv5u3/sfHM75qRYoIautbdfzWW3i',
  is_admin = TRUE
WHERE email = 'admin@unlimiteddatagh.com';

-- If user doesn't exist, create it
INSERT INTO users (email, password, phone_number, full_name, referral_code, is_admin)
VALUES (
  'admin@unlimiteddatagh.com',
  '$2a$10$Z9duZU4BCNNjYG82mRjNeuq2QGv5u3/sfHM75qRYoIautbdfzWW3i',
  '0240000000',
  'Administrator',
  'ADMIN123',
  TRUE
) ON CONFLICT (email) DO UPDATE SET 
  password = '$2a$10$Z9duZU4BCNNjYG82mRjNeuq2QGv5u3/sfHM75qRYoIautbdfzWW3i',
  is_admin = TRUE;
```

### Step 4: Login
1. Go to: **http://localhost:5173/login**
2. Enter:
   - **Email:** `admin@unlimiteddatagh.com`
   - **Password:** `admin123`
3. Click "Login"

### Step 5: Access Admin Panel
After login, go to: **http://localhost:5173/admin**

---

## 🎯 That's It!

You now have admin access with:
- ✅ View all users
- ✅ Export CSV files
- ✅ View bonus-qualified users
- ✅ See top referrers
- ✅ Manage admin privileges
- ✅ Search users
- ✅ View real-time stats

**Admin Panel URL:** http://localhost:5173/admin

---

## 📱 Test It

Try submitting an entry:
1. Go to http://localhost:5173
2. Enter phone: `0241112233`
3. Submit
4. Go to admin panel
5. You should see the entry!

---

## 🔑 Admin Credentials

- **Email:** admin@unlimiteddatagh.com
- **Password:** admin123
- **Admin Panel:** http://localhost:5173/admin
