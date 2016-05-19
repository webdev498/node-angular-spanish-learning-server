ALTER TABLE addresses ADD COLUMN type uuid;

ALTER TABLE addresses ADD CONSTRAINT addresses_address_types_id_fk FOREIGN KEY (type) REFERENCES address_types (id);