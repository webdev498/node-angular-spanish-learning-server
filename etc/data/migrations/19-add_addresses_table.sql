CREATE TABLE IF NOT EXISTS addresses (
  id UUID PRIMARY KEY,
  street VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(2),
  postal_code VARCHAR(16),
  user_id UUID NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  CONSTRAINT addresses_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id)
);
ALTER TABLE IF EXISTS addresses OWNER TO cgi;