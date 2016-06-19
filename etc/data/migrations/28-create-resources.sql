CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP
);
  CREATE TRIGGER resources_timestamp AFTER UPDATE ON resources
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();