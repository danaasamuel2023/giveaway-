# 🚀 CREATE DATABASE TABLES NOW

## Quick Steps to Create Tables

The backend is trying to connect but tables don't exist yet. Follow these steps:

### 1. Open Supabase Dashboard
Go to: https://supabase.com/dashboard/project/ynzxtgcgkmfcmgjrcgyj

### 2. Click "SQL Editor" (left sidebar)

### 3. Copy This SQL Code:

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  phone_number TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  referral_code TEXT UNIQUE NOT NULL,
  referred_by UUID REFERENCES users(id) ON DELETE SET NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  data_awarded INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create referrals table
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  referee_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(referrer_id, referee_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_referral_code ON users(referral_code);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone_number);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referee ON referrals(referee_id);

-- Insert first admin user (password hash will need to be updated)
INSERT INTO users (email, password, phone_number, full_name, referral_code, is_admin)
VALUES (
  'admin@unlimiteddatagh.com',
  '$2a$10$example_hash_replace_with_real_hash',
  '0240000000',
  'Administrator',
  'ADMIN123',
  TRUE
) ON CONFLICT (email) DO NOTHING;
```

### 4. Paste into SQL Editor and Click "RUN"

### 5. You Should See "Success" Message

### 6. Generate Admin Password Hash

Run this in Node.js to get the bcrypt hash:

```javascript
const bcrypt = require('bcryptjs');
bcrypt.hash('admin123', 10).then(hash => console.log(hash));
```

Or use: https://bcrypt-generator.com/ (rounds: 10)

### 7. Update Admin Password in Supabase SQL Editor:

```sql
UPDATE users 
SET password = 'your_generated_hash_here' 
WHERE email = 'admin@unlimiteddatagh.com';
```

### 8. Test Signup Now!

Go to: http://localhost:5173/signup

Fill the form and submit - it should work now! ✨

## What This Creates:

✅ `users` table - Stores all user accounts  
✅ `referrals` table - Tracks referral relationships  
✅ Indexes - For fast database lookups  
✅ Default admin user - For accessing admin panel  

## Quick Admin Setup:

After creating tables, update the admin password:

1. Visit: https://bcrypt-generator.com/
2. Enter password: `admin123` (or your choice)
3. Set rounds to: `10`
4. Generate hash
5. Run UPDATE SQL above

Then login to admin panel at: http://localhost:5173/admin
