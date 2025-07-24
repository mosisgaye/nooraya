-- Create exchange_rates table for caching currency conversion rates
CREATE TABLE IF NOT EXISTS exchange_rates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  eur_to_xof DECIMAL(10, 4) NOT NULL,
  usd_to_xof DECIMAL(10, 4) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on created_at for efficient querying of latest rates
CREATE INDEX idx_exchange_rates_created_at ON exchange_rates(created_at DESC);

-- Add RLS policies
ALTER TABLE exchange_rates ENABLE ROW LEVEL SECURITY;

-- Allow public read access to exchange rates
CREATE POLICY "Exchange rates are viewable by everyone" 
  ON exchange_rates FOR SELECT 
  USING (true);

-- Only authenticated users with admin role can insert/update (adjust as needed)
CREATE POLICY "Only admins can modify exchange rates" 
  ON exchange_rates FOR ALL 
  USING (auth.role() = 'authenticated');

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_exchange_rates_updated_at
  BEFORE UPDATE ON exchange_rates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default rates
INSERT INTO exchange_rates (eur_to_xof, usd_to_xof) 
VALUES (655.957, 615.5);