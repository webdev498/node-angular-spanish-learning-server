CREATE TABLE IF NOT EXISTS nationalities
(
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
ALTER TABLE IF EXISTS users ADD CONSTRAINT users_nationality_id_fk FOREIGN KEY (nationality_id) REFERENCES nationalities (id);
ALTER TABLE IF EXISTS nationalities OWNER TO cgi;