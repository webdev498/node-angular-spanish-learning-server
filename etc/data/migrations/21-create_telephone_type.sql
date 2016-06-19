CREATE TABLE telephone_types
(
    id UUID PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL
);
CREATE UNIQUE INDEX "telephone_id_uindex" ON telephone_types (id);