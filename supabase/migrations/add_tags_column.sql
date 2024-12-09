-- Add tags column to transactions table
ALTER TABLE transactions 
ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';

-- Add index for tags search
CREATE INDEX IF NOT EXISTS idx_transactions_tags ON transactions USING gin(tags); 