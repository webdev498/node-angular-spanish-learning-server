CREATE TABLE choices
(
    id UUID PRIMARY KEY NOT NULL,
    text VARCHAR(255) NOT NULL,
    translation VARCHAR(255) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    phase INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP
);
