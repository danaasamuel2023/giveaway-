-- Add exported_at column to track which users have been exported
-- Run this in Supabase SQL Editor

ALTER TABLE users ADD COLUMN IF NOT EXISTS exported_at TIMESTAMP WITH TIME ZONE;
CREATE INDEX IF NOT EXISTS idx_users_exported ON users(exported_at);

-- Add comment
COMMENT ON COLUMN users.exported_at IS 'Timestamp when user was last exported for data bundle distribution';
