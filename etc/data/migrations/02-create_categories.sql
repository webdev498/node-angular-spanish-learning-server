CREATE TABLE categories
(
    id UUID PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    parent_id UUID REFERENCES categories(id),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP
);
