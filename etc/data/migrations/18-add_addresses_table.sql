CREATE TABLE IF NOT EXISTS addresses (
  id UUID PRIMARY KEY,
  street VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(2),
  postal_code VARCHAR(16),
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP
);