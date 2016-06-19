CREATE TABLE IF NOT EXISTS permissions_roles(
  permission_id UUID REFERENCES permissions(id),
  role_id UUID REFERENCES roles(id),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP
);
CREATE TRIGGER permissions_roles_timestamp AFTER UPDATE ON permissions_roles
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();