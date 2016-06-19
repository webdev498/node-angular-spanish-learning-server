CREATE TABLE IF NOT EXISTS roles
(
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL ,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP
);

CREATE TRIGGER roles_timestamp AFTER UPDATE ON roles
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();