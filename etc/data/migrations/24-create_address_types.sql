CREATE TABLE address_types
(
    id UUID PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL
);
CREATE UNIQUE INDEX "address_id_uindex" ON address_types (id);

ALTER TABLE address_types OWNER TO cgi;