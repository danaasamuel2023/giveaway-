# ✅ Update Existing Admin Password

## 🎯 The Admin User Already Exists!

Error: "duplicate key value violates unique constraint"
- This means the admin user already exists
- But the password might be wrong

---

## 🔧 Update the Password

### Run This SQL in Supabase:

Go to: https://supabase.com/dashboard/project/ynzxtgcgkmfcmgjrcgyj/editor

**Paste and Run:**

```sql
-- Update admin user password
UPDATE users 
SET 
  password = '$2a$10$X8doUUX6OjwMqB8SL4e30.34CYP4/eOe4h5Y.9tLrKu17bMwvsnke',
  is_admin = TRUE,
  data_awarded = 1
WHERE email = 'sunumanfred14@gmail.com';
```

**Click RUN** ✅

---

## 🧪 Login Now

### Credentials:
```
Email: sunumanfred14@gmail.com
Password: Kingfred4190
```

### URLs:
- Local: http://localhost:5173/login
- Production: https://giveaway-jt3w.vercel.app/login

---

## ✅ Should Work Now!

The admin user exists, password has been updated, so login should work!

**Run the UPDATE SQL above and try login again!** 🚀
