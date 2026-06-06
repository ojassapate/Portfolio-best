-- Portfolio Data Table
-- Run this SQL in the Neon Console (https://console.neon.tech) → SQL Editor

CREATE TABLE IF NOT EXISTS portfolio_data (
  id INTEGER PRIMARY KEY DEFAULT 1,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Ensure only one row exists
  CONSTRAINT single_row CHECK (id = 1)
);

-- Insert default empty row (will be populated on first save)
-- The frontend will fall back to hardcoded defaults if no row exists
