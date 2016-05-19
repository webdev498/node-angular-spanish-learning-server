ALTER TABLE telephones ADD COLUMN type uuid;

ALTER TABLE telephones ADD CONSTRAINT telephones_telephone_types_id_fk FOREIGN KEY (type) REFERENCES telephone_types (id);