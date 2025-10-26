// Setup Admin Script
// Run this in Supabase SQL Editor

// First, create admin user if not exists
INSERT INTO users (email, password, phone_number, full_name, referral_code, is_admin, data_awarded)
VALUES (
  'admin@unlimiteddatagh.com',
  '$2a$10$Z9duZU4BCNNjYG82mRjNeuq2QGv5u3/sfHM75qRYoIautbdfzWW3i',
  '0240000000',
  'Administrator',
  'ADMIN123',
  TRUE,
  1
) ON CONFLICT (email) DO UPDATE SET 
  password = '$2a$10$Z9duZU4BCNNjYG82mRjNeuq2QGv5u3/sfHM75qRYoIautbdfzWW3i',
  is_admin = TRUE;

-- Verify admin was created
SELECT email, is_admin, full_name FROM users WHERE email = 'admin@unlimiteddatagh.com';

