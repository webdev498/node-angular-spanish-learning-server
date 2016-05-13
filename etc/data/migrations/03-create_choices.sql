CREATE TABLE choices
(
    id UUID PRIMARY KEY NOT NULL,
    text VARCHAR(255) NOT NULL,
    translation VARCHAR(255) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    version VARCHAR(40) NOT NULL,
    phase INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);
COMMENT ON COLUMN choices.version IS 'SHA-1 Hash of Text & Translation fields';
CREATE UNIQUE INDEX "choices_id_uindex" ON choices (id);
