CREATE TABLE question_types
(
    id UUID PRIMARY KEY NOT NULL,
    text VARCHAR(255) NOT NULL,
    version VARCHAR(40) NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);
CREATE UNIQUE INDEX "question_types_id_uindex" ON question_types (id);
