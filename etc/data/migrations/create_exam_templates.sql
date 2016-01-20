CREATE TABLE exam_templates
(
    id UUID PRIMARY KEY NOT NULL,
    phase INTEGER DEFAULT 1 NOT NULL,
    passing_threshold INTEGER,
    attempts INTEGER,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);
CREATE UNIQUE INDEX "exam_templates_id_uindex" ON exam_templates (id);
