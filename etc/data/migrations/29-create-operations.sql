CREATE TABLE IF NOT EXISTS operations(
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP
);
CREATE TRIGGER operations_timestamp AFTER UPDATE ON operations
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();