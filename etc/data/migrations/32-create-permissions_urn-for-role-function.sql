CREATE OR REPLACE FUNCTION find_permissions_for_role (role_uuid UUID)
  RETURNS TABLE(
    permission VARCHAR
  )
  AS $$
  BEGIN
    RETURN QUERY SELECT DISTINCT
      ('urn:cgi:permission:' || concat_ws('::', resources.name::TEXT, operations.name::TEXT))::VARCHAR as permission
    FROM
      permissions INNER JOIN permissions_roles ON permissions.id = permissions_roles.permission_id, operations, resources
    WHERE
      permissions.operation_id = operations.id AND
      permissions.resource_id = resources.id AND
      permissions_roles.role_id = role_uuid;
  END; $$

  LANGUAGE 'plpgsql'