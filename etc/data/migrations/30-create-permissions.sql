CREATE TABLE IF NOT EXISTS permissions
(
  id UUID PRIMARY KEY,
  resource_id UUID REFERENCES resources(id),
  operation_id UUID REFERENCES operations(id),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP,
  UNIQUE (resource_id, operation_id)
);

CREATE TRIGGER permissions_timestamp AFTER UPDATE ON permissions
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();