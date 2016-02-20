\set role_password `echo $DB_PASSWORD`
\set db_name `echo $DB_NAME`
\set db_user `echo $DB_USER`
CREATE ROLE :db_user WITH NOSUPERUSER CREATEDB ENCRYPTED PASSWORD :role_password;
GRANT ALL PRIVILEGES ON DATABASE :db_name TO :db_user
