CREATE TABLE categories
(
    id UUID PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    parent_id UUID,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);
CREATE UNIQUE INDEX "Categories_id_uindex" ON categories (id);
CREATE INDEX "Categories_parent_id_index" ON categories (parent_id);
