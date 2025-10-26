-- Copy this entire file and paste in Supabase SQL Editor

-- Create admin user with password: admin123
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
