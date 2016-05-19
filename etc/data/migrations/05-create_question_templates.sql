CREATE TABLE question_templates
(
    text VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    id UUID PRIMARY KEY NOT NULL
);
CREATE UNIQUE INDEX question_templates_id_uindex ON question_templates (id);
